import React from 'react'
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

const ExpensesTable = ({ expensesData }: { expensesData: ExpensesDataTypes[] }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">日付</TableHead>
                    <TableHead>タイトル</TableHead>
                    <TableHead>カテゴリ</TableHead>
                    <TableHead>関連イベント</TableHead>
                    <TableHead className="text-right">金額</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {/* <TableRow>
                    <TableCell className="font-medium">2026/02/23</TableCell>
                    <TableCell>OO公演</TableCell>
                    <TableCell>チケット代</TableCell>
                    <TableCell>ツアー東京</TableCell>
                    <TableCell className="text-right">￥12000</TableCell>
                </TableRow> */}
                {expensesData.map((expense) => (
                    <TableRow key={expense.id}>
                        <TableCell className="font-medium">{expense.date.toLocaleDateString()}</TableCell>
                        <TableCell>{expense.memo}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell>{expense.eventId}</TableCell>
                        <TableCell>￥{expense.amount}</TableCell>
                    </TableRow>
                )) }
            </TableBody>
        </Table>
    )
}

export default ExpensesTable