import React from 'react'
import { ChartBarMultiple } from './Chart-bar-multiple'
import { ChartLineLabel } from './Chart-line-label'


const ChartSession = () => {
  return (
    <div className='flex flex-col gap-8 max-w-lg w-full  '>
        <ChartBarMultiple/>
        <ChartLineLabel/>
    </div>
  )
}

export default ChartSession