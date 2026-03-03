'use client'
import React, { useState, useTransition } from 'react'
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
import DeleteConfirmAlertDialog from '../repoUi/DeleteConfirmAlertDialog';
import { deleteExpenses } from '@/app/expenses/action';
import { toast } from 'sonner';
import { Spinner } from '../ui/spinner';
import SortDropdownMenu from '../repoUi/SortDropdownMenu';



const ExpenseTable = ({ eventData, expensesData }: { eventData: ExpensesEventProps[]; expensesData: ExpensesDataTypes[] }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedExpenses, setSelectedExpenses] = useState<Set<string>>(new Set);
  const [showConfirmAlert, setShowConfirmAlert] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const selectedCheckBox = (id: string, isEditMode: boolean) => {
    if (!isEditMode) return;

    const newSelectedExpenses = new Set(selectedExpenses)
    if (newSelectedExpenses.has(id)) {
      newSelectedExpenses.delete(id)
    } else {
      newSelectedExpenses.add(id)
    }
    setSelectedExpenses(newSelectedExpenses)
  }

  const exitEditMode = () => {
    setIsEditMode(false)
    setSelectedExpenses(new Set())
  }

  const handleDelete = async () => {
    if (selectedExpenses.size === 0) return;

    const result = await deleteExpenses(Array.from(selectedExpenses));

    if (result.success) {
      setShowConfirmAlert(false)
      toast('削除成功しました', { position: 'bottom-center' })
      setIsEditMode(false);
      setSelectedExpenses(new Set());
    } else {
      toast('削除失敗、しばらくしてからもう一度お試しください', { position: 'bottom-center' })
    }
  }

  return (
    <div className='border-2 border-gray-400 h-[40vh] p-2'>
      <div className='flex-Between flex-row overflow-auto border-b-2 pb-2'>
        <div className='flex-Center gap-2'>
          <AddExpensesButton
            eventSelectItemsData={eventData}
            isEditMode={isEditMode}
          />
          {
            isEditMode ?
              <>
                <Button
                  variant={'outline'}
                  disabled={selectedExpenses.size === 0}
                  onClick={() => setShowConfirmAlert(true)}
                >
                  削除
                  <DeleteIcon />
                </Button>
                <Button
                  variant={'outline'}
                  onClick={exitEditMode}
                >
                  キャンセル
                </Button>
              </>

              :
              <Button variant={'outline'} onClick={() => setIsEditMode(true)}>編集<ModeEditIcon /></Button>
          }
        </div>
        <div className='flex-Center gap-2'>
          <SortDropdownMenu
            startTransition={startTransition}
          />
          <Button variant={'outline'} >絞り込み</Button>
        </div>
      </div>

      {isPending ?
        <div className='flex-Center'>
          <Spinner />
        </div>
        :
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
                    className={`${isEditMode ? 'visible' : 'invisible'} border-gray-400`}
                    onClick={() => selectedCheckBox(expense.id, isEditMode)}
                    checked={selectedExpenses.has(expense.id)}
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
      }

      <DeleteConfirmAlertDialog
        open={showConfirmAlert}
        onOpenChange={setShowConfirmAlert}
        onConfirmDelete={handleDelete}
        count={selectedExpenses.size}
        title={'出費項目'}
      />
    </div>
  )
}

export default ExpenseTable