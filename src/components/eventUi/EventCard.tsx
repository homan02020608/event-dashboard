import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { EventCardTypesSource } from '@/types/type'
import { Checkbox } from '../ui/checkbox'

const EventCard = ({ title, date, venue, seat, eventStartTime }: EventCardTypesSource) => {

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className='flex font-medium w-full px-6' >
                    <div className='w-full flex-Between'>
                        {title}
                        <div>
                            <span>{date?.toLocaleDateString('ja-JP')}</span>
                            <span className='ml-2'>{eventStartTime}</span>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className='flex-Between gap-6 text-xs font-semibold px-6'>
                    {/* <div>公演日:<span>{date?.toLocaleDateString('ja-JP')}</span><span className='ml-2'>{eventStartTime}</span></div> */}
                    <div>会場:<span>{venue}</span></div>
                    <div>座席:<span>{seat}</span></div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default EventCard