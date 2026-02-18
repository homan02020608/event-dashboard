import { prisma } from "@/lib/prisma"
import { GetEventParmas } from "@/types/type"
import { createClient } from "@/utils/supabase/server"


export async function getEventData({ sort }: GetEventParmas) {
    const supabase = createClient()
    const { data: { user } } = await (await supabase).auth.getUser()

    if (!user) {
        throw new Error('ログインしてください')
    }

    const [field, order] = sort?.split('_') as [string, 'asc' | 'desc'];

    //セキュリティ対策としてsort許可リスト作成
    const validSortFields = ['date', 'createdAt', 'updatedAt'];
    const safeField = validSortFields.includes(field) ? field : 'date'

    const userEvent = await prisma.event.findMany({
        where: {
            authorId: user.id
        },
        orderBy: {
            [safeField]: order
        }
    })
    return userEvent
}