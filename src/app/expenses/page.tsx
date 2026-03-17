import ExpensesChartSession from '@/components/ExpensesUi/ExpensesChartSession'
import React from 'react'
import { calculateSummary, getAnnualExpenseCount, getEventsForChart, getExpensesData } from './data'
import ExpenseTable from '@/components/ExpensesUi/ExpenseTable'

const page = async () => {
  //const expensesData = await getExpensesData();
  //const { summaryData } = await getExpensesSummaryData();
  const [expensesData, annualEventCount, eventsForChartData] = await Promise.all([
    getExpensesData(),
    getAnnualExpenseCount(),
    getEventsForChart()
  ])
  
  const { monthlyAverage, currentMonthTotal } = calculateSummary(expensesData.userExpenses)

  return (
    <div className="bg-white/70 shadow-2xl rounded-lg m-2 mx-4 p-2 space-y-6">
      {/* <h1 className='text-2xl flex-Center border'>費用管理一覧</h1> */}
      {/* 費用関連のグラフセクション */}
      <ExpensesChartSession
        summaryData={{
          annualEventCount,
          monthlyAverage,
          currentMonthTotal
        }}
        expensesData={expensesData.userExpenses}
        eventsForChartData={eventsForChartData}
      />
      {/* 実際の出費データ */}
      <ExpenseTable
        eventData={expensesData.userEvent}
        expensesData={expensesData.userExpenses}
      />
    </div>
  )
}

export default page