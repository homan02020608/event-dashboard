import { Prisma } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { GetRepoParams } from "@/types/type"
import { createClient } from "@/utils/supabase/server"


export async function getRepoData({ sort, repoType, artistName, isPublic }: GetRepoParams) {
    const supabase = createClient()
    const { data: { user } } = await (await supabase).auth.getUser()

    if (!user) {
        //return
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


