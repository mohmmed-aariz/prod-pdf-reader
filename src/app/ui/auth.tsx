'use client'

import { signIn, signOut } from 'next-auth/react'

export const LoginButton = () => {
  return <button className='border border-black m-2' onClick={() => signIn()}>Sign in</button>
}

export const LogoutButton = () => {
  return <button className='border border-black m-2' onClick={() => signOut()}>Sign Out</button>
}
