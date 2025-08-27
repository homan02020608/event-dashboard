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

const formSchema = z.object({
    eventTitle: z.string().min(1),
    date: z.string(),
    region: z.string(),
    venue: z.string().min(1),
    seat: z.string().min(1),
})

const AddEventButton = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            eventTitle: '',
            date: '',
            region: '',
            venue: '',
            seat: '',
        },
    })
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
                    <form className="space-y-8 p-2 m-4">
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
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
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

export default AddEventButton