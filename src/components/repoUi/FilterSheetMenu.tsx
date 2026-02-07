import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../ui/button'
import TuneIcon from '@mui/icons-material/Tune';

const FilterSheetMenu = () => {
  return (
     <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline"><TuneIcon fontSize='small'/>絞り込み</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>絞り込み</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default FilterSheetMenu