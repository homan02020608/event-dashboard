'use client'
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '../ui/button'
import TuneIcon from '@mui/icons-material/Tune';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox'
import { FilterColumn } from '@/types/filter'

type FilterSheetMenuProps = {
  columns: FilterColumn[];
  startTransition: React.TransitionStartFunction;
}


const FilterSheetMenu = ({ startTransition, columns }: FilterSheetMenuProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleCheckBox = (key: string, value: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams);

    const currentValues = params.get(key)?.split(',').filter(Boolean) || [];

    let newValues: string[];

    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((v) => v !== value);
    }

    if (newValues.length > 0) {
      params.set(key, newValues.join(','));
    } else {
      params.delete(key)
    }
    /*  startTransition(() => {
       router.push(`${pathname}?${params.toString()}`, { scroll: false })
     }) */
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline"><TuneIcon fontSize='small' />絞り込み</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>絞り込み</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Accordion type='multiple' className='w-full mt-4 border-2 p-2'>
          {columns.map((section) => {
            const selectedValues = searchParams.get(section.key)?.split(',') || [];
            return (
              <AccordionItem key={section.key} value={section.key}>
                <AccordionTrigger className="text-sm font-bold text-gray-700">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className='space-y-3 pt-2'>
                    {section.options.map((option) => (
                      <div key={option.value} className='flex items-center space-x-2'>
                        <Checkbox
                          id={`${section.key}-${option.value}`}
                          checked={selectedValues.includes(option.value)}
                          onCheckedChange={(checked) => handleCheckBox(section.key, option.value, checked === true)}
                        />
                        <Label
                          htmlFor={`${section.key}-${option.value}`}
                          className="text-sm cursor-pointer w-full py-1"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
        <SheetFooter>
          <Button
            variant={'outline'}
            onClick={() => router.push(pathname)}
          >
            クリア
          </Button>
          <SheetClose asChild>
            <Button variant="outline">閉じる</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default FilterSheetMenu