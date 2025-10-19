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

type RepoDetailsProps = {
    repoId: string
    artistName: string
    part: string
    sheets: string
    date: Date
}

const RepoDetailsDialog = ({ repoId, artistName, part, sheets, date }: RepoDetailsProps) => {
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
                    <DialogTitle>{artistName}</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                {isLoading && <div>ローディング中...</div>}
                {/* レポ表示 */}
                {repo &&
                    <div>
                        <div>{part}部{sheets}枚</div>
                        <div>{date.toLocaleDateString()}</div>
                        {(repo.conversations as Conversation[]).map((conver) => (
                            <div key={`${repoId}-${conver.order}-${conver.sender}`}>
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