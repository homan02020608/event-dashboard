import ExpensesChartSession from '@/components/ExpensesUi/ExpensesChartSession'
import ExpensesList from '@/components/ExpensesUi/ExpensesList'
import React from 'react'
import { getExpensesData } from './data'

const page = async () => {
  const expensesData = await getExpensesData()
 
  return (
    <div className="bg-white/70 shadow-2xl rounded-lg m-2 mx-4 p-2 space-y-8">
      <h1 className='text-2xl p-2 flex-Center border'>費用管理一覧</h1>
      {/* 費用関連のグラフセクション */}
      <ExpensesChartSession />
      {/* 実際の出費データ */}
      <ExpensesList />
    </div>
  )
}

export default page