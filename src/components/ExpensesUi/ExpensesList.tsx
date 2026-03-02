'use client'
import React, { useState } from 'react'
import ExpensesTable from './ExpensesTable'
import { Button } from '../ui/button'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddExpensesButton from './AddExpensesButton';
import { ExpensesDataTypes, ExpensesEventProps } from '@/types/type';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from '../ui/checkbox';



const ExpensesList = ({ eventData, expensesData }: { eventData: ExpensesEventProps[]; expensesData: ExpensesDataTypes[] }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
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

  const exitEditMode = () => {
    setIsEditMode(false)
    setIsSelectedExpenses(new Set())
  }
  
  return (
    <div className='border-2 border-gray-400 h-[40vh] p-2'>
      <div className='flex-Between flex-row overflow-auto border-b-2 pb-2'>
        <div className='flex-Center gap-2'>
          <AddExpensesButton
            eventSelectItemsData={eventData}
          />
          {
            isEditMode ?
              (<Button variant={'outline'} onClick={exitEditMode}>キャンセル</Button>)
              :
              (<Button variant={'outline'} onClick={() => setIsEditMode(true)}>編集<ModeEditIcon /></Button>)
          }
        </div>
        <div className='flex-Center gap-2'>
          <Button variant={'outline'}>並び替え</Button>
          <Button variant={'outline'}>絞り込み</Button>
        </div>
      </div>

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
    </div>
  )
}

export default ExpensesList