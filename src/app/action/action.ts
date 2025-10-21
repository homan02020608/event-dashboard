'use server'

import { prisma } from "@/lib/prisma"
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

export async function getRepoList() {
    const supabase = createClient()
    const { data: { user } } = await (await supabase).auth.getUser()

    if (!user) {
        throw new Error('ログインしてください')
    }

    const allRepoDataList = await prisma.report.findMany({
        where: {
            authorId: user.id
        },
        select: {
            id: true,
            part: true,
            sheets: true,
            repoType: true,
            artistName: true,
            date: true,
            venue: true
        }
    })
    return allRepoDataList
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
        console.error('Server Action error:',error)
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