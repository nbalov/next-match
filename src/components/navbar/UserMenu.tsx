'use client'

import { Avatar} from '@heroui/avatar'
import { Dropdown, DropdownMenu, DropdownItem, DropdownSection, DropdownTrigger } from '@heroui/dropdown'
import { Session } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import {signOutUser} from '@/app/actions/authActions'
import {transformImageUrl} from '../../lib/util'

type Props = {
    user: Session['user'],
    image: string | null | undefined
}

export default function UserMenu({user, image}: Props) {

    /*
    import { getMemberByUserId } from '@/app/actions/memberActions'
    import {Member} from '@prisma/client'

    const [image, setImage] = useState('')

    useEffect(() => {
        async function fetchMember(): Promise<Member|undefined|null> {
            if (!user) {
                return null
            }
            const member = await getMemberByUserId(user.id as string)
            setImage(member?.image as string)
        }
        fetchMember()
    }, [user])
    console.log('fetchMember', image);
    */

    // can't call signOut from client component
    return (
    <Dropdown placement='bottom-end'>
        <DropdownTrigger>
            <Avatar 
                isBordered
                as='button'
                className='transition-transform'
                color='primary'
                name={image || 'user avatar'}
                size='sm'
                src={transformImageUrl(image) || '/images/user.png'}
            />
        </DropdownTrigger>
        <DropdownMenu variant='flat' area-label='User actions menu'>
            <DropdownSection showDivider>
                <DropdownItem key={1} isReadOnly as='span' className='h-14 flex flex-row' area-label='username'>
                    Signed in as {user?.name}
                </DropdownItem>
            </DropdownSection>
            <DropdownItem key={2} as={Link} href='/members/edit'>
                Edit profile
            </DropdownItem>
            <DropdownItem key={3} color='danger' onPress={async () => signOutUser()}>
                Log out
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
  )
}
