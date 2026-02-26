"use server"

import { expensesFormSchema } from "@/components/ExpensesUi/AddExpensesButton";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function createExpenses(formData: z.infer<typeof expensesFormSchema>) {
    try {
        const supabase = createClient()
        const { data: { user } } = await (await supabase).auth.getUser()

        if (!user) {
            throw new Error('ログインしてください');
        }

        //eventIdを選択しないまたは該当イベント存在しない、eventIdデータが空の時に変換処理
        const validEventId = (formData.eventId === "" || formData.eventId === "none") ? undefined : formData.eventId;

        await prisma.expense.create({
            data: {
                memo: formData.title,
                amount: formData.amount,
                category: formData.category,
                eventId: validEventId,
                date: formData.date,
                authodId: user.id,
            }
        })

        revalidatePath('/expenses')
        console.log('保存成功')
        return { success: true }
    } catch (error) {
        console.error('db保存エラー:', error)
        return { success: false, message: '送信失敗' }
    }
}