'use server'

import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import z from "zod";

const reportSchema = z.object({
    part: z.string().min(1),
    sheets: z.string().min(1),
    repoType: z.string(),
    artistName: z.string().min(1),
    venue: z.string().min(1),
    date: z.string().min(1, { message: '日付は必須です' }),
    conversations: z.string()
})

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

export async function getRepoDetails(repoId: string) {
    try {
        const supabase = createClient()
        const { data: { user } } = await (await supabase).auth.getUser()

        if (!user) {
            throw new Error('ログインしてください');
        }

        const repo = await prisma.report.findUnique({
            where: {
                //指定されたrepoId かつ　repo作者または公開中のrepoだけ探す
                id: repoId,
                OR: [
                    { authorId: user.id },
                    { isPublic: true }
                ]
            },
            select: {
                venue: true,
                conversations: true
            }
        })

        if(!repo) {
            throw new Error('Repo Not Found');
        }
        return repo
    } catch (error) {
        console.error('Server Action error:', error)
        return null
    }
}