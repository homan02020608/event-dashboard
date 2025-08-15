import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req : NextRequest){
    const {email , name } = await req.json()

    const res = await prisma.user.create({
        data : {
            email : email ,
            name : name ,
        }
    });

    return NextResponse.json(res)
}