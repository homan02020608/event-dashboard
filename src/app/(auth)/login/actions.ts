'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"
import { prisma } from "@/lib/prisma"

export async function login(formData: FormData) {
  const supabase = await createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const loginData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const { data, error } = await supabase.auth.signInWithPassword(loginData)
  if (error) {
    redirect('/error')
  }
  const user = data.user
  if (user) {
    //userがdbに存在するかチェック
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id }
    })

    if(!existingUser){
      await prisma.user.create({
        data : {
          id : user.id,
          email : user.email ?? '',
          name : user.email?.split('@')[0] ?? 'ユーザー'
        }
      })
      console.log('新規ユーザーがDBに登録されました!',user.id)
    }
  }
  


  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}