import { ExpensesSummaryProps } from '@/types/type'
import React from 'react'

const ExpensesSummaryCard = ({annualEventCount, monthlyAverage, currentMonthTotal}: ExpensesSummaryProps) => {
  return (
    <div className='flex flex-col border shadow-sm border-gray-400 rounded-2xl p-4'>
        <div className='font-semibold'>Summary</div>
        <div className='flex flex-col font-semibold text-sm p-2 gap-4'>
          <div><strong className='font-extralight'>年間参加回数</strong><br />{annualEventCount}</div>
          <div><strong className='font-extralight'>月間平均額</strong><br />{monthlyAverage} 円</div>
          <div><strong className='font-extralight'>今月合計額</strong><br />{currentMonthTotal} 円</div>
        </div>
      </div>
  )
}

export default ExpensesSummaryCard