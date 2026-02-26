"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Button } from '../ui/button'
import AddIcon from '@mui/icons-material/Add';
import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { DialogClose } from '@radix-ui/react-dialog'
import { ExpensesEventProps } from '@/types/type'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { format } from 'date-fns'
import { Calendar } from '../ui/calendar'
import { createExpenses } from '@/app/expenses/action'
import { Spinner } from '../ui/spinner'

export const expensesFormSchema = z.object({
    title: z.string().min(1, {
        message: 'タイトルは必須です'
    }),
    amount: z.number().min(1, {
        message: '一円以上の金額を入力してください'
    }),
    category: z.string().min(1, {
        message: 'カテゴリ選択は必須です'
    }),
    eventId: z.string(),
    date: z.date({
        message: '日付を選択してください'
    }),
})

const CATEGORY_SELECTITEMS = [
    { value: 'TICKET', label: 'チケット代' },
    { value: 'GOODS', label: 'グッズ代' },
    { value: 'TRANSPORTATION', label: '交通費' },
    { value: 'ACCOMMODATION', label: '宿泊費' },
    { value: 'OTHER', label: 'その他' },
]

const AddExpensesButton = ({ eventSelectItemsData }: { eventSelectItemsData: ExpensesEventProps[] }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const form = useForm<z.infer<typeof expensesFormSchema>>({
        resolver: zodResolver(expensesFormSchema),
        defaultValues: {
            title: '',
            amount: 0,
            category: '',
            eventId: '',
        }
    })
    const onSubmit = async (data: z.infer<typeof expensesFormSchema>) => {
        const result = await createExpenses(data)
        if (result.success) {
            form.reset()
            setIsOpen(false)
        } else {
            console.error('保存失敗：', result.message)
        }
    }

    const { isSubmitting } = form.formState

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={'outline'}>追加<AddIcon /></Button>
            </DialogTrigger>
            <DialogContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>出費項目追加</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <FieldGroup className='border p-2'>
                        <div className='grid gap-6'>
                            <Controller
                                control={form.control}
                                name='title'
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>タイトル</FieldLabel>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            autoComplete='off'
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                control={form.control}
                                name='amount'
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>金額</FieldLabel>
                                        <div className='relative'>
                                            <span className='absolute left-3 top-1/2 -translate-y-1/2 '>¥</span>
                                            <Input
                                                {...field}
                                                aria-invalid={fieldState.invalid}
                                                autoComplete='off'
                                                type='number'
                                                value={field.value || ''}
                                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                                className='pl-6'
                                            />
                                        </div>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                control={form.control}
                                name='date'
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>日付</FieldLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="date-picker-simple"
                                                    className="justify-start font-normal"
                                                >
                                                    {field.value ? format(field.value, "PPP") : <span>日付選択</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode='single'
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date("1990-01-01")
                                                    }
                                                    captionLayout='dropdown'
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                control={form.control}
                                name='category'
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>カテゴリ</FieldLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder='カテゴリ選択' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {CATEGORY_SELECTITEMS.map((item) => (
                                                    <SelectItem value={item.value} key={item.value}>{item.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                control={form.control}
                                name='eventId'
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>関連イベント</FieldLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder='イベント選択' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {eventSelectItemsData.map((item) => (
                                                    <SelectItem value={item.id} key={item.id}>{item.title}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                variant={'outline'}
                                onClick={() => form.reset()}
                                disabled={isSubmitting}
                            >
                                キャンセル
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <Spinner /> : '追加'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddExpensesButton