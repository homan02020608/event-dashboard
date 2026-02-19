import { Prisma } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { GetEventParmas } from "@/types/type"
import { createClient } from "@/utils/supabase/server"


export async function getEventData({ sort, region }: GetEventParmas) {
    const supabase = createClient()
    const { data: { user } } = await (await supabase).auth.getUser()

    if (!user) {
        throw new Error('ログインしてください')
    }

    const where: Prisma.EventWhereInput = {
        authorId: user.id
    }

    // url queryに存在する項目のみ絞り込み
    if (region) {
        where.region = {
            in: region.split(',').filter(Boolean)
        }
    }

    const [field, order] = sort?.split('_') as [string, 'asc' | 'desc'];

    //セキュリティ対策としてsort許可リスト作成
    const validSortFields = ['date', 'createdAt', 'updatedAt'];
    const safeField = validSortFields.includes(field) ? field : 'date'

    const userEvent = await prisma.event.findMany({
        where,
        select: {
            id: true,
            title: true,
            date: true,
            region: true,
            venue: true,
            seat: true,
            eventStartTime: true,
        },
        orderBy: {
            [safeField]: order
        }
    })
    return userEvent
}

export async function getEventDataForCalculat(){
    const supabase = createClient()
    const {data: {user}} = await (await supabase).auth.getUser()

    if (!user) {
        throw new Error('ログリンしてください')
    }

    const userEvent = await prisma.event.findMany({
        where: {
            authorId: user.id
        },
        orderBy: {
            date: 'desc'
        }
    })

    return userEvent
}