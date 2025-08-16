
import { Button } from '@/components/ui/button'
import React from 'react'
import { login, signup } from './actions'

const loginPage = () => {
  return (
    <div className='flex-Center flex-col gap-20'>
      <form className='flex-Center flex-col p-6 border gap-10 border-gray-200 rounded-xl shadow-xl  max-w-xl w-full'>

        <div className='flex justify-start flex-col w-full '>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required className='rounded-md border-2 border-gray-300 p-2 px-4' />
        </div>
        <div className='flex justify-start flex-col w-full'>
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="text" required className='rounded-md border-2 border-gray-300 p-2 px-4' />

        </div>

        <Button formAction={login} variant={'ghost'} className='w-full hover:bg-gray-300'>Log in</Button>
        <Button formAction={signup} variant={'ghost'} className='w-full hover:bg-gray-300'>Sign up</Button>


      </form>
    </div>
  )
}

export default loginPage