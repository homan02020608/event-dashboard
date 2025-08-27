'use server'

import { prisma } from "@/lib/prisma"
import { createClient } from "@/utils/supabase/server"

export async function createEvent() {
    const supabase = createClient()
    const { data: { user } } = await (await supabase).auth.getUser()

    await prisma.event.create({
        data: {
            authorId: user?.id || "",
            title: '',
            date: '',
            region: '',
            venue: '',
            seat: '',
        }
    })
}