import React from 'react'
import ExpensesTable from './ExpensesTable'
import { Button } from '../ui/button'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddExpensesButton from './AddExpensesButton';

const ExpensesList = () => {

  return (
    <div className='border-2 border-gray-400 h-[40vh] p-2'>
      <div className='flex-Between flex-row overflow-auto border-b-2 pb-2'>
        <div className='flex-Center gap-2'>
          <AddExpensesButton/>
          <Button variant={'outline'}>編集<ModeEditIcon/></Button>
        </div>
        <div className='flex-Center gap-2'>
          <Button variant={'outline'}>並び替え</Button>
          <Button variant={'outline'}>絞り込み</Button>
        </div>
      </div>
      <ExpensesTable />
    </div>
  )
}

export default ExpensesList