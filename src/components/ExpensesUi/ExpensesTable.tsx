'use client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ExpensesDataTypes } from '@/types/type'
import { Checkbox } from '../ui/checkbox'

type ExpensesTableProps = {
    expensesData: ExpensesDataTypes[];
    isEditMode: boolean;
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}

const ExpensesTable = ({ expensesData, isEditMode, setIsEditMode }: ExpensesTableProps) => {
    const [isSelectedExpenses, setIsSelectedExpenses] = useState<Set<string>>(new Set)

    const selectedCheckBox = (id: string, isEditMode: boolean) => {
        if (!isEditMode) return;

        const selectedExpenses = new Set(isSelectedExpenses)
        if (selectedExpenses.has(id)) {
            selectedExpenses.delete(id)
        } else {
            selectedExpenses.add(id)
        }
        setIsSelectedExpenses(selectedExpenses)
    }
    console.log(isSelectedExpenses)
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead className="w-[100px]">日付</TableHead>
                    <TableHead>タイトル</TableHead>
                    <TableHead>カテゴリ</TableHead>
                    <TableHead>関連イベント</TableHead>
                    <TableHead>金額</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {expensesData.map((expense) => (
                    <TableRow key={expense.id}>
                        <TableCell>
                            <Checkbox
                                className={`${isEditMode ? 'visible' : 'invisible'}`}
                                onClick={() => selectedCheckBox(expense.id, isEditMode)}
                                checked={isSelectedExpenses.has(expense.id)}
                            />
                        </TableCell>
                        <TableCell className="font-medium">{expense.date.toLocaleDateString('ja-JP')}</TableCell>
                        <TableCell>{expense.memo}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell>{expense.event?.title ? expense.event.title : "該当なし"}</TableCell>
                        <TableCell>￥{expense.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default ExpensesTable