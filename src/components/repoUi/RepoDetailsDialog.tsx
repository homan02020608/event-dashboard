"use client"
import React, { useState } from 'react'
import useSWR from 'swr'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { getRepoDetails } from '@/app/action/action';
import { Conversation } from '@/types/type';
import MessageBubble from './MessageBubble';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { Spinner } from '../ui/spinner';

type RepoDetailsProps = {
    repoId: string
    artistName: string
    part: string
    sheets: string
    date: Date
    venue: string
}

const RepoDetailsDialog = ({ repoId, artistName, part, sheets, date, venue }: RepoDetailsProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const { data: repo, error, isLoading } = useSWR(
        isOpen ? ['repo', repoId] : null,
        ([_key, id]) => getRepoDetails(id),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false
        }
    )
    //console.log('Repo:', repo)
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger><KeyboardArrowRightIcon fontSize='large' /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{artistName} {part}部</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                {isLoading && <div className='flex-Center'><Spinner className='size-8'/></div>}
                {/* レポ表示 */}
                {repo &&
                    <div className='border-2 p-4 rounded-xl font-light text-sm'>
                        <div className='flex justify-between border-b-2 pb-1'>
                            <div>{date.toLocaleDateString()}</div>
                            <div className='flex-End flex-col '>
                                <div><ConfirmationNumberIcon className='text-red-400' /> {sheets}枚</div>
                            </div>    
                        </div>
                        {(repo.conversations as Conversation[]).map((conver) => (
                            <div key={`${repoId}-${conver.order}-${conver.sender}`} className='my-2'>
                                <MessageBubble
                                    sender={conver.sender}
                                    text={conver.text}
                                />
                            </div>
                        ))}
                    </div>
                }
            </DialogContent>
        </Dialog>
    )
}

export default RepoDetailsDialog