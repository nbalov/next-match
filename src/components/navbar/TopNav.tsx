// this is a server-side component
// 'use server' is assumed

import { Navbar, NavbarBrand, NavbarContent } from '@heroui/navbar'
import React from 'react'
import { Button} from "@heroui/button"
import { Link } from "@heroui/link"
//import {GiBattleMech} from 'react-icons/gi'
//import {GiBrain} from 'react-icons/gi'
import {GiVintageRobot} from 'react-icons/gi'
import NavLink from './NavLink';
import { auth } from '@/auth';
import UserMenu from './UserMenu';
import {getUserInfoForNav} from '@/app/actions/userActions'

export default async function TopNav() {

    // session cookie
    // on the server side, we can only read this cookie, not modify it
    const session = await auth();
    const userInfo = session?.user && await getUserInfoForNav()
    //console.log("session", session)

    return (
    <Navbar
        maxWidth='xl'
        className='bg-gradient-to-r from-blue-400 to-blue-700'
        classNames={{item: [
            'text-xl', 'text-white', 'uppercase', 
            'data-[active=true]:text-white-200'
        ]}}
        >
        <NavbarBrand>
            <GiVintageRobot size={25} />
            <div className='font-bold text-3xl m-2 flex'>
                <span className='text-gray-200'>next</span>
                <span className='text-gray-800'>Match</span>
            </div>
        </NavbarBrand>
        <NavbarContent justify='center'>
            <NavLink href='/members' label='Members' ></NavLink>
            <NavLink href='/lists' label='Lists' ></NavLink>
        </NavbarContent>
        <NavbarContent justify='end'>
            {session?.user ? (
                <UserMenu user={session.user} image={userInfo?.image} />
            ) : (
                <>
                    <Button as={Link} href='/login' variant='bordered' className='text-white'>Login</Button>
                    <Button as={Link} href='/register' variant='bordered' className='text-white'>Register</Button>
                </>
            )}
        </NavbarContent>
    </Navbar>
  )
}
