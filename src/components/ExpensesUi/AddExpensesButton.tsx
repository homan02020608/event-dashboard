"use client"
import React from 'react'
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

const formSchema = z.object({
    title: z.string().min(1, {
        message: 'タイトルは必須です'
    }),
    /*      category: z.string().min(1, {
            message: 'カテゴリ選択は必須です'
        }), */
    amount: z.number().min(1, {
        message: '一円以上の金額を入力してください'
    }),
    /*     eventId: z.string().min(1, {
            message: 'タイトルは必須です'
        }),
        date: z.date({
            message: '日付を選択してください'
        }),  */
})

const AddExpensesButton = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            //category: '',
            amount: 0,
            //eventId: '',
        }
    })
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log('フォームデータ：', data)
    }

    return (
        <Dialog>
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
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            autoComplete='off'
                                            type='number'
                                            value={field.value || ''}
                                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                        />
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
                            >
                                キャンセル
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                        >
                            追加
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddExpensesButton