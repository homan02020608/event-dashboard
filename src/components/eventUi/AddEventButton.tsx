"use client"
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import { cn } from '@/lib/utils'
import { createEvent } from '@/app/action/action'


const formSchema = z.object({
    eventTitle: z.string().min(1),
    region: z.string(),
    venue: z.string().min(1),
    seat: z.string().min(1),
    date: z.date({
        message: "A date of birth is required"
    }),
    eventStartTime: z.string().min(1),
})

const AddEventButton = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            eventTitle: '',
            region: '',
            venue: '',
            seat: '',
            date: new Date(),
            eventStartTime: '12:00:00',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();

        formData.append('eventTitle', values.eventTitle)
        formData.append('region', values.region)
        formData.append('venue', values.venue)
        formData.append('seat', values.seat)
        formData.append('date', values.date.toISOString())
        formData.append('eventStartTime', values.eventStartTime)
        console.log(values)
        await createEvent(formData) 
    }
    return (
        <Sheet>
            <SheetTrigger asChild className='mx-4'>
                <Button variant={'outline'}>Add Event</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>参戦イベント追加</SheetTitle>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2 m-4">
                        <FormField
                            control={form.control}
                            name="eventTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>公演名</FormLabel>
                                    <FormControl>
                                        <Input placeholder="event" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="region"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>地域</FormLabel>
                                    <FormControl>
                                        <Input placeholder="region" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="venue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>会場</FormLabel>
                                    <FormControl>
                                        <Input placeholder="venue" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="seat"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>座席</FormLabel>
                                    <FormControl>
                                        <Input placeholder="seat" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>公演日</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
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
                                            </FormControl>
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
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="eventStartTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>開演時刻</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='time'
                                            id='time-picker'
                                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none" 
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <SheetClose asChild className='border w-full'>
                            <Button type="submit" className='hover:underline ' variant={'outline'}>追加</Button>
                        </SheetClose>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}

export default AddEventButton