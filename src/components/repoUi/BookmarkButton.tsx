"use client"
import React, { startTransition, useOptimistic, useState } from 'react'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Button } from '../ui/button';
import { bookmarkReport } from '@/app/repo/action';



type BookmarkProps = {
    repoId: string
    initialIsBookmarked: boolean
    isEditMode: boolean
}

const BookmarkButton = ({ repoId, initialIsBookmarked, isEditMode }: BookmarkProps) => {
    //const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
    const [isBookmarked, setOptimisticBookmark] = useOptimistic(
        initialIsBookmarked,
        (state, updateState: boolean) => updateState
    );

    const handleBookmark = async () => {
        //UIを楽観的更新
        startTransition(() => {
            setOptimisticBookmark(!isBookmarked)
        })
        //server action
        await bookmarkReport(repoId)
    }
    return (
        <Button
            size={'xs'}
            variant={'ghost'}
            className='transition-transform duration-300'
            onClick={handleBookmark}
            disabled={isEditMode}
        >
            {isBookmarked ? <BookmarkIcon/> : <BookmarkBorderIcon/>}
        </Button>
    )
}

export default BookmarkButton