import { prisma } from "@/lib/prisma"
import { createClient } from "@/utils/supabase/server"


export async function getAllEventDataById() {
    const supabase = createClient()
    const { data: { user } } = await (await supabase).auth.getUser()

    if (!user) {
        throw new Error('ログインしてください')
    }

    const userEvent = await prisma.event.findMany({
        where: {
            authorId: user.id
        },
        orderBy: {
            date: 'asc'
        }
    })
    return userEvent
}