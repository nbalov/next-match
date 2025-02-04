import React from 'react'
import LoginForm from './LoginForm'
import "../../globals.css"

// navbar height is about 64px
// vertical-center is defined in globals.css

export default function LoginPage() {
  return (
    <div className='flex items-center justify-center vertical-center'>
      <LoginForm />
    </div>
  )
}