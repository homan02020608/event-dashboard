'use server'

import { Prisma } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { GetRepoParams } from "@/types/type"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import z from "zod"

const reportSchema = z.object({
    part: z.string().min(1),
    sheets: z.string().min(1),
    repoType: z.string(),
    artistName: z.string().min(1),
    venue: z.string().min(1),
    date: z.string().min(1, { message: '日付は必須です' }),
    conversations: z.string()
})

// ログインしているauthorIdでEvent項目を追加
export async function createEvent(formData: FormData) {
    const supabase = createClient()
    const { data: { user } } = await (await supabase).auth.getUser()

    if (!user) {
        throw new Error('ログインしてください。')
    }

    await prisma.event.create({
        data: {
            authorId: user?.id || "",
            title: formData.get('eventTitle') as string,
            date: new Date(formData.get('date') as string),
            eventStartTime: formData.get('eventStartTime') as string,
            region: formData.get('region') as string,
            venue: formData.get('venue') as string,
            seat: formData.get('seat') as string,
        }
    })
    revalidatePath('/events')
}
// userId(authorId)でEventデータ一覧を取得
export async function getAllEventDataById() {
    const supabase = createClient()
    const { data: { user } } = await (await supabase).auth.getUser()

    if (!user) {
        throw new Error('ログインしてください')
    }

    const userEvent = await prisma.event.findMany({
        where: {
            //authorId: '2ae55831-7e54-49fb-b041-d932ab4af21a'
            authorId: user.id
        },
        orderBy: {
            date: 'asc'
        }
    })
    return userEvent
}

export async function getRepoData({ sort, repoType, artistName, isPublic }: GetRepoParams) {
    const supabase = createClient()
    const { data: { user } } = await (await supabase).auth.getUser()

    if (!user) {
        throw new Error('ログインしてください')
    }
    //初期値はログインしているuserIdのみ該当のrepo取得
    const where: Prisma.ReportWhereInput = {
        authorId: user.id
    }

    // url queryに存在する項目のみ絞り込み
    if (repoType) {
        where.repoType = {
            in: repoType.split(',').filter(Boolean)
        }
    }

    if (artistName) {
        where.artistName = {
            in: artistName.split(',').filter(Boolean)
        }
    }

    if (isPublic) {
        const isPublicParams = isPublic.split(',').filter(Boolean)
        
        //「公開」と「非公開」どちらか片方だけの場合のみ絞り込み
        if(isPublicParams.includes('true') && !isPublicParams.includes('false')){
            where.isPublic = true;
        } else if (isPublicParams.includes('false') && !isPublicParams.includes('true')){
            where.isPublic = false;
        }
    }

    const [field, order] = sort?.split('_') as [string, 'asc' | 'desc'];
    
    //セキュリティ対策としてsort許可リスト作成
    const validSortFields = ['date', 'createdAt', 'updatedAt'];
    const safeField = validSortFields.includes(field) ? field : 'date';

    const reports = await prisma.report.findMany({
        where,
        select: {
            id: true,
            part: true,
            sheets: true,
            repoType: true,
            artistName: true,
            date: true,
            venue: true,
            isPublic: true,
            bookmarks: {
                where: {
                    userId: user.id
                },
                select: {
                    id: true
                }
            }
        },
        orderBy: {
            [safeField]: order
        }
    })

    const reportsWithStatus = reports.map((repo) => ({
        ...repo,
        isBookmarked: repo.bookmarks.length > 0
    }))
    return reportsWithStatus
}

export async function getRepoDetails(repoId: string) {
    try {
        const repo = await prisma.report.findUnique({
            where: {
                id: repoId,
            },
            select: {
                venue: true,
                conversations: true
            }
        })
        return repo
    } catch (error) {
        console.error('Server Action error:', error)
        return null
    }
}

export async function createReport(formData: FormData) {
    try {
        const supabase = createClient()
        const { data: { user } } = await (await supabase).auth.getUser()

        if (!user) {
            throw new Error('ログインしてください');
        }
        //data check 
        const parsedData = Object.fromEntries(formData.entries());
        const validatedFields = reportSchema.safeParse(parsedData);

        if (!validatedFields.success) {
            return { errors: validatedFields.error.flatten().fieldErrors };
        }

        const {
            part,
            sheets,
            repoType,
            artistName,
            date,
            venue,
            conversations,
        } = validatedFields.data;

        const conversationArray = JSON.parse(conversations);

        await prisma.report.create({
            data: {
                artistName: artistName,
                venue: venue,
                repoType: repoType,
                part: part,
                sheets: sheets,
                date: new Date(date),
                conversations: conversationArray,
                authorId: user.id,
                tags: [],
            }
        })

        revalidatePath('/repo')
        console.log('保存成功')
        return { success: true }
    } catch (error) {
        console.error('db保存エラー:', error)
        return { success: false, message: '送信失敗' }
    }
}

export async function deleteReport(reportIds: string[]) {
    try {
        await prisma.report.deleteMany({
            where: {
                id: {
                    in: reportIds
                },
            },
        });
        revalidatePath('/repo')
        return { success: true }
    } catch (error) {
        console.error('削除エラー:', error)
        return { success: false, error: '削除失敗' };
    }
}

export async function bookmarkReport(reportId: string) {
    const supabase = createClient()
    const { data: { user } } = await (await supabase).auth.getUser()

    if (!user) {
        throw new Error('ログインしてください');
    }

    try {
        const isBookmarkExisting = await prisma.bookmark.findUnique({
            where: {
                userId_repoId: {
                    userId: user.id,
                    repoId: reportId,
                },
            }
        });

        if (isBookmarkExisting) {
            await prisma.bookmark.delete({
                where: { id: isBookmarkExisting.id }
            });
        } else {
            await prisma.bookmark.create({
                data: {
                    userId: user.id,
                    repoId: reportId,
                }
            })
        }

        revalidatePath('/repo')
        return { success: true }
    } catch (error) {
        return { success: false }
    }
}