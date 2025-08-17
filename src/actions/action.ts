"use server"

import { prisma } from "@/lib/prisma"

export async function createUser(formData: FormData){
    await prisma.user.create({
        data : {
            id : "testingId02",
            email : formData.get('email') as string,
            name : (formData.get('email') as string).split('@')[0]
        }
    })
}