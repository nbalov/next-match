'use client'

import { Card, CardHeader, CardBody } from '@heroui/react'
import React from 'react'
import {GiPadlock} from 'react-icons/gi'
import {Input, Button} from '@heroui/react'
import { useForm } from 'react-hook-form'
import {LoginSchema, loginSchema} from '../../../lib/schemas/loginSchema'
import {zodResolver} from '@hookform/resolvers/zod'
import {signInUser} from '@/app/actions/authActions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

// w-2/5: 2/5th of the available width
// mx-auto: equal margins left and right

// useForm requires `use client'

export default function LoginForm() {

    // use useRouter from 'next/navigation' not the old one from 'next/router'
    const router = useRouter();

    const {register, handleSubmit, formState: {errors, isSubmitting} } = 
        useForm<LoginSchema>({
          resolver: zodResolver(loginSchema),
          mode: 'onTouched'
        })

    // errors.email contains errors related to email field

    const onSubmit = async (data: LoginSchema) => {
        // signInUser is server-side function
        const result = await signInUser(data);
        if (result.status === 'success') {
            router.push('/members')
        }
        else {
            toast.error(result.error as string);
        }
    }

    return (
    <Card className='w-2/5 mx-auto'>
        <CardHeader className='flex flex-col items-center justify-center'>
            <div className='flex flex-col gap-2 items-center text-primary'>
                <div className='flex flex-row items-center gap-3'>
                    <GiPadlock size={30} />
                    <h1 className='text-3xl font-semibold'>Login</h1>
                </div>
                <p className='text-neutral-500'>Welcome back to bayesBot</p>
            </div>
        </CardHeader>
        <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-4'>
                    <Input 
                        label='Email'
                        variant='bordered'
                        {...register('email')}
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                    />
                    <Input 
                        label='Password'
                        variant='bordered'
                        type='password'
                        {...register('password')}
                        isInvalid={!!errors.password}
                        errorMessage={errors.password?.message}
                    />
                    <Button isLoading={isSubmitting} isDisabled={!!errors.email || !!errors.password} 
                            fullWidth color='primary' type='submit'>
                        Login
                    </Button>
                </div>
            </form>
        </CardBody>
    </Card>
    )
}
