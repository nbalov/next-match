'use client'

import { Card, CardHeader, CardBody } from '@heroui/react'
import React from 'react'
import {GiPadlock} from 'react-icons/gi'
import {Input, Button} from '@heroui/react'
import { useForm } from 'react-hook-form'
import {RegisterSchema, registerSchema} from '../../../lib/schemas/registerSchema'
import {zodResolver} from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import {registerUser} from '@/app/actions/authActions'
import {handleFormServerErrors} from '../../../lib/util'

// w-2/5: 2/5th of the available width
// mx-auto: equal margins left and right

// useForm requires `use client'

export default function RegisterForm() {

    // use useRouter from 'next/navigation' not the old one from 'next/router'
    const router = useRouter();

    const {register, handleSubmit, setError, formState: {errors, isValid, isSubmitting} } = 
        useForm<RegisterSchema>({
          resolver: zodResolver(registerSchema),
          mode: 'onTouched'
        })

    // errors.email contains errors related to email field

    const onSubmit = async (data: RegisterSchema) => {
        // registerUser is server-side function
        const result = await registerUser(data);
        if (result.status === 'success') {
            console.log('User registered successfully');
            router.push('/login');
        }
        else {
            handleFormServerErrors(result, setError)
        }
    }

    return (
    <Card className='w-2/5 mx-auto'>
        <CardHeader className='flex flex-col items-center justify-center'>
            <div className='flex flex-col gap-2 items-center text-primary'>
                <div className='flex flex-row items-center gap-3'>
                    <GiPadlock size={30} />
                    <h1 className='text-3xl font-semibold'>Register</h1>
                </div>
                <p className='text-neutral-500'>Welcome to bayesBot</p>
            </div>
        </CardHeader>
        <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-4'>
                    <Input 
                        label='Name'
                        variant='bordered'
                        {...register('name')}
                        isInvalid={!!errors.name}
                        errorMessage={errors.name?.message}
                    />
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
                    {errors.root?.serverError && (
                            <p className='text-danger text-sm'>{errors.root.serverError .message}</p>
                    )}
                    <Button isDisabled={!isValid} isLoading={isSubmitting}
                            fullWidth color='primary' type='submit'>
                        Register
                    </Button>
                </div>
            </form>
        </CardBody>
    </Card>
    )
}
