'use server'

import { prisma } from "@/lib/prisma"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

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
            authorId: '2ae55831-7e54-49fb-b041-d932ab4af21a'
        },
        orderBy: {
            date: 'asc'
        }
    })
    return userEvent
}