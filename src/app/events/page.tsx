import React from 'react'
import { getAllEventDataById } from './data'
import EventCardList from '@/components/eventUi/EventCardList'

const page = async () => {
  const eventData = await getAllEventDataById()

  return (
    <div className="bg-white/70 shadow-2xl rounded-lg m-2 mx-4 p-2">
      <h1 className='text-2xl p-2 flex-Center'>参戦履歴</h1>
      <EventCardList eventData={eventData}/>
    </div>
  )
}

export default page