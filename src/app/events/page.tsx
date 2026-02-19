import React from 'react'
import { getEventData } from './data'
import EventCardList from '@/components/eventUi/EventCardList'
import { GetEventParmas } from '@/types/type'

const page = async ({ searchParams }: { searchParams: GetEventParmas }) => {
  const { sort, region } = await searchParams
  const sortValues = sort || 'date_desc'
  const eventData = await getEventData({
    sort: sortValues,
    region: region
  })

  return (
    <div className="bg-white/70 shadow-2xl rounded-lg m-2 mx-4 p-2">
      <h1 className='text-2xl p-2 flex-Center'>参戦履歴</h1>
      <EventCardList eventData={eventData} />
    </div>
  )
}

export default page