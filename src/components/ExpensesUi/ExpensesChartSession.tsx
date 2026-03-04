import React from 'react'
import ExpensesSummaryCard from './ExpensesSummaryCard'
import { ExpensesSummaryProps } from '@/types/type'

type Props = {
  summaryData: ExpensesSummaryProps
}

const ExpensesChartSession = ({ summaryData }: Props) => {
  return (
    <div className='flex border border-gray-400 h-[30vh] p-2 gap-4'>
      {/* Summary Session 文字や数字情報のみ */}
      <ExpensesSummaryCard
        annualEventCount={summaryData.annualEventCount}
        monthlyAverage={summaryData.monthlyAverage}
        currentMonthTotal={summaryData.currentMonthTotal}
      />
      {/* グラフ集計情報 */}
      <div className='flex flex-col border shadow-sm border-gray-400 rounded-2xl p-4'>
        <div>グラフ</div>
      </div>
    </div>
  )
}

export default ExpensesChartSession