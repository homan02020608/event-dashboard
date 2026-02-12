"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
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
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AddIcon from '@mui/icons-material/Add';
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import ClearIcon from '@mui/icons-material/Clear';
import { cn } from '@/lib/utils'
import { format } from "date-fns"

import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'
import { createReport } from '@/app/repo/action'


const conversationSchema = z.object({
    sender: z.enum(['user', 'artist']),
    text: z.string().min(1, { message: '発言内容は必須です' }),
})

const formSchema = z.object({
    artistName: z.string().min(1, {
        message: 'アーティスト名は必須です'
    }),
    venue: z.string().min(1, {
        message: '会場名は必須です'
    }),
    repoType: z.string().min(1, {
        message: 'レポ種類は必須です'
    }),
    part: z.string().min(1, {
        message: '部数は必須です'
    }),
    sheets: z.string().min(1, {
        message: '枚数は必須です'
    }),
    date: z.date({
        error: "公演日を選択してください",
    }),
    conversations: z.array(conversationSchema).min(1, {
        message: '会話を一つ以上追加してください',
    }),
})

const AddRepoButton = () => {
    const [isOpen, setIsOpen] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            artistName: "",
            venue: "",
            repoType: "",
            part: "",
            sheets: "",
            conversations: [{ sender: 'user', text: '' }]
        }
    })
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'conversations'
    })
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const formData = new FormData()
        const conversationsWithOrder = data.conversations.map((conversation, index) => ({
            ...conversation,
            order: index + 1,
        }))
        const finalData = {
            ...data,
            conversations: conversationsWithOrder
        }

        formData.append('artistName', finalData.artistName)
        formData.append('venue', finalData.venue)
        formData.append('repoType', finalData.repoType)
        formData.append('part', finalData.part)
        formData.append('sheets', finalData.sheets)
        formData.append('date', finalData.date.toISOString())
        formData.append('conversations', JSON.stringify(conversationsWithOrder))

        const result = await createReport(formData)
        if (result.success) {
            form.reset()
            setIsOpen(false)
            toast("追加成功しました", { position: 'bottom-center' })
        } else {
            console.error('保存失敗：', result.errors)
        }
    }
    const { isSubmitting } = form.formState

    return (
        <div className='py-2'>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">レポ追加<AddIcon /></Button>
                </DialogTrigger>
                <DialogContent className="">
                    <form onSubmit={form.handleSubmit(onSubmit)} id="form-rhf-demo">
                        <DialogHeader>
                            <DialogTitle>レポ追加</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <FieldGroup className='p-2'>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Controller
                                        control={form.control}
                                        name='artistName'
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel>アーティスト名</FieldLabel>
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
                                </div>
                                <div className="grid gap-2">
                                    <Controller
                                        control={form.control}
                                        name='venue'
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel>会場名</FieldLabel>
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
                                </div>
                                <div className='grid gap-2'>
                                    <Controller
                                        control={form.control}
                                        name="date"
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel>公演日</FieldLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date < new Date("1900-01-01")
                                                            }
                                                            captionLayout="dropdown"
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </div>
                                <div className='flex-Center gap-4'>
                                    <div className="grid gap-2 w-full relative pb-6">
                                        <Controller
                                            control={form.control}
                                            name='repoType'
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel>レポ種類</FieldLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="レポ種類選択" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="online_meeting">オンライン話し会</SelectItem>
                                                            <SelectItem value="real_meeting">リアル話し会</SelectItem>
                                                            <SelectItem value="online_sign">オンラインサイン会</SelectItem>
                                                            <SelectItem value="real_sign">リアルサイン会</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {fieldState.invalid && (
                                                        <FieldError errors={[fieldState.error]} className='absolute -bottom-1 left-0 text-xs' />
                                                    )}
                                                </Field>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2 w-full relative pb-6">
                                        <Controller
                                            control={form.control}
                                            name='part'
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel>部数</FieldLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="部数選択" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="1">第1部</SelectItem>
                                                            <SelectItem value="2">第2部</SelectItem>
                                                            <SelectItem value="3">第3部</SelectItem>
                                                            <SelectItem value="4">第4部</SelectItem>
                                                            <SelectItem value="5">第5部</SelectItem>
                                                            <SelectItem value="6">第6部</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {fieldState.invalid && (
                                                        <FieldError errors={[fieldState.error]} className='absolute -bottom-1 left-0 text-xs' />
                                                    )}
                                                </Field>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2 w-full relative pb-6">
                                        <Controller
                                            control={form.control}
                                            name='sheets'
                                            render={({ field, fieldState }) => (
                                                <Field>
                                                    <FieldLabel>枚数</FieldLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="枚数選択" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="1">1</SelectItem>
                                                            <SelectItem value="2">2</SelectItem>
                                                            <SelectItem value="3">3</SelectItem>
                                                            <SelectItem value="4">4</SelectItem>
                                                            <SelectItem value="5">5</SelectItem>
                                                            <SelectItem value="6">6</SelectItem>
                                                            <SelectItem value="7">7</SelectItem>
                                                            <SelectItem value="8">8</SelectItem>
                                                            <SelectItem value="9">9</SelectItem>
                                                            <SelectItem value="10">10</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {fieldState.invalid && (
                                                        <FieldError errors={[fieldState.error]} className='absolute -bottom-1 left-0 text-xs' />
                                                    )}
                                                </Field>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-4">
                                    <Label htmlFor="conversations">会話レポ</Label>
                                    <div className='flex flex-col gap-2 overflow-y-auto max-h-64 '>
                                        {fields.map((field, index) => (
                                            <div key={field.id} className='flex space-x-2'>
                                                <Controller
                                                    control={form.control}
                                                    name={`conversations.${index}.sender`}
                                                    render={({ field, fieldState }) => (
                                                        <Field>
                                                            <Select
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="発言者" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="user">自分</SelectItem>
                                                                    <SelectItem value="artist">推し</SelectItem>
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
                                                    name={`conversations.${index}.text`}
                                                    render={({ field, fieldState }) => (
                                                        <Field>
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
                                                <Button
                                                    variant={'ghost'}
                                                    onClick={() => remove(index)}
                                                    disabled={fields.length === 1}
                                                >
                                                    <ClearIcon fontSize='small' />
                                                </Button>
                                            </div>
                                        ))}
                                        {/*                                         <input className='border rounded-sm p-2 min-w-3xs' /> */}
                                    </div>
                                    <div
                                        className='flex-Center flex-col w-full border hover:cursor-pointer hover:bg-gray-100 rounded-sm'
                                        onClick={() => {
                                            append({ text: '', sender: 'user' })
                                        }}
                                    >
                                        <AddIcon fontSize='small' className='text-gray-600' />
                                    </div>
                                </div>
                            </div>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button 
                                    variant="outline" 
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
                                {isSubmitting ? <Spinner/> : '追加'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default AddRepoButton