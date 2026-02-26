import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";


export async function getExpensesData() {
    const supabase = createClient()
    const { data: { user } } = await (await supabase).auth.getUser()

    if (!user) {
        throw new Error('ログインしてください')
    }

    const where: Prisma.ExpenseWhereInput = {
        authodId: user.id
    }

    const userExpenses = await prisma.expense.findMany({
        where,
        select: {
            id: true,
            amount: true,
            category: true,
            memo: true,
            date: true,
            eventId: true,
        },
        orderBy: { date: 'desc' }
    })

    const userEvent = await prisma.event.findMany({
        where: { authorId: user.id },
        select: {
            id: true,
            title: true,
        },
        orderBy: { date: 'desc' }
    })

    return { userExpenses, userEvent }
}