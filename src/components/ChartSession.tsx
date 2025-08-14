import React from 'react'
import { ChartBarMultiple } from './Chart-bar-multiple'

const ChartSession = () => {
  return (
    <div className='flex flex-col lg:flex-row gap-8 '>
        <ChartBarMultiple/>
        <ChartBarMultiple/>
    </div>
  )
}

export default ChartSession