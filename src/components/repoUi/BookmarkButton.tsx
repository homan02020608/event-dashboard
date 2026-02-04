"use client"
import React, { useState } from 'react'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Button } from '../ui/button';

type BookmarkProps = {
    repoId: string
    initialIsBookmarked: boolean
}

const BookmarkButton = ({ repoId, initialIsBookmarked }: BookmarkProps) => {
    const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
    return (
        <Button
            size={'xs'}
            variant={'ghost'}
            className='transition-transform duration-300'
            onClick={() => setIsBookmarked(!isBookmarked)}
        >
            {isBookmarked ? <BookmarkIcon/> : <BookmarkBorderIcon/>}
        </Button>
    )
}

export default BookmarkButton