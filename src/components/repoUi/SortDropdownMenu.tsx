"use client"
import React, { useTransition } from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const sort_options = [
    { label: '新しい順', value: 'date_desc' },
    { label: '古い順', value: 'date_asc' },
]

type Props = {
    startTransition: React.TransitionStartFunction;
}

const SortDropdownMenu = ({ startTransition }: Props) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    //ソート順取得や初期値設定
    const currentSort = searchParams.get('sort') || 'date_desc';

    const handleSort = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('sort', value);

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll: false })
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline"><SwapVertIcon fontSize='small' />並び替え</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuRadioGroup value={currentSort} onValueChange={handleSort}>
                    {sort_options.map((option) => (
                        <DropdownMenuRadioItem key={option.value} value={option.value}>
                            {option.label}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SortDropdownMenu