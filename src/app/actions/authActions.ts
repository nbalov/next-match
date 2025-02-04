'use server';

import {RegisterSchema, registerSchema} from '@/lib/schemas/registerSchema'
import bcrypt from 'bcryptjs'
import {prisma} from '@/lib/prisma'
import {User} from '@prisma/client'
import {ActionResult} from '@/types'
import {LoginSchema} from '@/lib/schemas/loginSchema'
import {signIn, signOut} from '@/auth'
import {AuthError} from "next-auth"
import {auth} from '@/auth';

export async function signInUser(data: LoginSchema) : Promise<ActionResult<string>> {
    // when user is successfully signed-in, NextAuth returns a session cookie, authjs.session-token
    // rather than the user data

    try {
        await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })
        //console.log(result);
        return {status: 'success', data: 'Logged in'}
    } catch (error) {
        //console.log(error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {status: 'error', error: 'Invalid credentials'}
                    break;
                default:
                    return {status: 'error', error: 'Something went wrong'}
            }
        }
        else {
            return {status: 'error', error: 'Something else went wrong'}
        }
    }
}

export async function signOutUser() {
    await signOut({redirectTo: '/'});
}

export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {

    try {
    
        // use zod to validate data
        const validated = registerSchema.safeParse(data);

        if (!validated.success) {
            // can't throw error from the server
            //throw new Error(validated.error.errors[0].message);
            return {status: 'error', error: validated.error.errors}
        }

        const {name, email, password} = validated.data;

        const existingUser = await prisma.user.findUnique({
            where: {email}
        });

        if (existingUser) {
            return {status: 'error', error: 'User already exists'};
        }

        // use bcrypt to encrypt password
        // 10: cost factor
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword
            }
        });

        // return async function create()
        return {status: 'success', data: user}
        
    } catch (error) {
        console.log(error);
        return {status: 'error', error: 'Something went wrong'};
    }
}

export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {email}
    });
}

export async function getUserById(id: string) {
    return prisma.user.findUnique({
        where: {id}
    });
}

export async function getAuthUserId() {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) throw new Error("Unothorised");
    return userId;
}