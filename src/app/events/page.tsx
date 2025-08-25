import EventCard from '@/components/eventUi/EventCard'
import { prisma } from '@/lib/prisma'
import { EventCardTypesSource } from '@/types/type'
import React from 'react'

const page = async () => {
  const events = await prisma.event.findMany()
  const user = await prisma.user.findMany({
    include: {
      event: true
    }
  })
  
  return (
    <div className="bg-white/70 shadow-2xl rounded-lg m-2 mx-4 p-2">
      <h1 className='text-2xl p-2 flex-Center'>参戦履歴</h1>
      <div>
        {events.map((event: EventCardTypesSource) => (
          <div key={event.id} className='m-4 my-8 bg-white rounded-xl text-black *:px-4 shadow-xl'>
            <EventCard
              title={event.title}
              date={event.date}
              venue={event.venue}
              seat={event.seat}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default page