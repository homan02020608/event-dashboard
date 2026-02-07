import React from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SwapVertIcon from '@mui/icons-material/SwapVert';

const SortDropdownMenu = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline"><SwapVertIcon fontSize='small'/>並び替え</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuGroup>
                    <DropdownMenuItem>おすすめ順</DropdownMenuItem>
                    <DropdownMenuItem>人気順</DropdownMenuItem>
                    <DropdownMenuItem>新しい順</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SortDropdownMenu