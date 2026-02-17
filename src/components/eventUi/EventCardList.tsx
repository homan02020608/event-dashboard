"use client"
import React, { useState, useTransition } from 'react'
import EventCard from './EventCard'
import AddEventButton from './AddEventButton'
import { Button } from '../ui/button'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Checkbox } from '../ui/checkbox'
import { EventCardTypes } from '@/types/type'
import { deleteEvents } from '@/app/events/action'
import { toast } from 'sonner'
import DeleteConfirmAlertDialog from '../repoUi/DeleteConfirmAlertDialog'

const EventCardList = ({ eventData }: { eventData: EventCardTypes[] }) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [selectedEventId, setSelectedEventId] = useState<Set<string>>(new Set());
    const [showConfirmAlert, setShowConfirmAlert] = useState<boolean>(false)
    const [isPending, startTransition] = useTransition();

    const selectCheckBox = (id: string , isEditMode: boolean) => {
        const newSelectedEvent = new Set(selectedEventId);
        if(!isEditMode) return

        if (newSelectedEvent.has(id)) {
            newSelectedEvent.delete(id)
        } else {
            newSelectedEvent.add(id)
        }
        setSelectedEventId(newSelectedEvent)
    }

    const exitEditMode = () => {
        setIsEditMode(false)
        setSelectedEventId(new Set())
    }

    const handleDelete = async () => {
        if (selectedEventId.size === 0) return;

        const result = await deleteEvents(Array.from(selectedEventId))

        if (result.success) {
            setShowConfirmAlert(false)
            toast("削除成功しました", { position: 'bottom-center' })
            setIsEditMode(false)
            setSelectedEventId(new Set());
        } else {
            toast('削除失敗、しばらくしてからもう一度お試しください', { position: 'bottom-center' })
        }
    }
    
    return (
        <div>
            <div className='flex-Between flex-row overflow-auto'>
                <div className='flex-Center gap-2 '>
                    <AddEventButton isEditMode={isEditMode}/>
                    {isEditMode ?
                        <>
                            <Button
                                variant="outline"
                                disabled={selectedEventId.size === 0}
                                onClick={() => setShowConfirmAlert(true)}
                            >
                                削除
                                <DeleteIcon />
                            </Button>
                            <Button
                                variant="outline"
                                onClick={exitEditMode}
                            >
                                キャンセル
                            </Button>
                        </>
                        :
                        <>
                            <Button variant="outline" onClick={() => setIsEditMode(true)}>編集<ModeEditIcon /></Button>
                        </>
                    }
                </div>
            </div>
            <div className=''>
                {eventData.map((event) => (
                    <div key={event.id} className='static flex flex-col my-4 bg-white rounded-xl text-black shadow-md '>
                        <Checkbox
                            className={`absolute ${isEditMode ? 'visible' : 'invisible'} `}
                            onClick={() => selectCheckBox(event.id, isEditMode)}
                            checked={selectedEventId.has(event.id)}
                        />
                        <div className='w-full'>
                            <EventCard
                                title={event.title}
                                date={event.date}
                                venue={event.venue}
                                seat={event.seat}
                                eventStartTime={event.eventStartTime}
                                isSelected={selectedEventId.has(event.id)}
                                isEditMode={isEditMode}
                                onToggle={() => selectCheckBox(event.id , isEditMode)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <DeleteConfirmAlertDialog
                open={showConfirmAlert}
                onOpenChange={setShowConfirmAlert}
                onConfirmDelete={handleDelete}
                count={selectedEventId.size}
                title={`イベント`}
            />
        </div>

    )
}

export default EventCardList