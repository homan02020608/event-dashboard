import React from 'react'
import ExpensesSummaryCard from './ExpensesSummaryCard'
import { CategorySummaryDataProps, EventsForChartDataProps, ExpensesDataTypes, ExpensesSummaryProps } from '@/types/type'
import { ExpensesCategroyChart } from './ExpensesCategoryChart'
import ExpensesTypeChart from './ExpensesTypeChart'

type Props = {
  summaryData: ExpensesSummaryProps
  eventsForChartData: EventsForChartDataProps[]
  categorySummaryData: CategorySummaryDataProps[]
}

const ExpensesChartSession = ({ summaryData, eventsForChartData, categorySummaryData }: Props) => {
  return (
    <div className='flex flex-col md:flex-row border-gray-400 lg:h-[35vh] p-2 gap-4 w-full overflow-y-scroll'>
      {/* Summary Session 文字や数字情報のみ */}
      <ExpensesSummaryCard
        annualEventCount={summaryData.annualEventCount}
        monthlyAverage={summaryData.monthlyAverage}
        currentMonthTotal={summaryData.currentMonthTotal}
      />
      {/* グラフ集計情報 */}
      <div className='flex border shadow-sm border-gray-400 rounded-2xl'>
        <ExpensesCategroyChart
          categorySummaryData={categorySummaryData}
        />
      </div>
      <div className='flex border shadow-sm border-gray-400 rounded-2xl'>
        <ExpensesCategroyChart
          categorySummaryData={categorySummaryData}
        />
      </div>
      <div className='flex border shadow-sm border-gray-400 rounded-2xl'>
        <ExpensesTypeChart
          eventsForChartData={eventsForChartData}
        />
      </div>
    </div>
  )
}

export default ExpensesChartSession