import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ExpensesDataTypes } from "@/types/type";
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
            event: {
                select: {
                    title: true,
                    date: true,
                }
            }
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

export async function getAnnualExpenseCount() {
    const supabase = createClient()
    const { data: { user } } = await (await supabase).auth.getUser()

    if (!user) {
        throw new Error('ログインしてください')
    }

    const now = new Date();
    const currentYear = now.getFullYear();

    //年間参加回数を取得
    const annualEventCount = await prisma.event.count({
        where: {
            authorId: user.id,
            date: {
                gte: new Date(currentYear, 0, 1),
                lt: new Date(currentYear + 1, 0, 1),
            }
        },
    })
    return annualEventCount
}

export function calculateSummary(expenses: ExpensesDataTypes[]) {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth()

    let currentYearTotal = 0;
    let currentMonthTotal = 0;

    expenses.forEach((expense) => {
        const eventDate = expense.event?.date;
        const expYear = eventDate?.getFullYear();
        const expMonth = eventDate?.getMonth();

        //年間の合計計算
        if (expYear === currentYear) {
            currentYearTotal += expense.amount;

            //今月の合計計算
            if (expMonth === currentMonth) {
                currentMonthTotal += expense.amount;
            }
        }
    })

    const passedMonths = currentMonth + 1;
    const monthlyAverage = Math.round(currentYearTotal / passedMonths);

    return { monthlyAverage, currentMonthTotal }
}