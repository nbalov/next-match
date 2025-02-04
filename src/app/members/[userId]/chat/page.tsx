import React from 'react'
import {getMemberByUserId} from '@/app/actions/memberActions'
import {notFound} from 'next/navigation'
import { CardHeader, CardBody} from '@heroui/card'
import { Divider} from '@heroui/divider'

export default async function ChatPage({params}: {params: {userId: string}}) {
    const member = await getMemberByUserId(params.userId);
    if (!member) return notFound();
    return (
    <>
        <CardHeader className='text-2xl font-semibold text-secondary'>
                Chats
            </CardHeader>
            <Divider />
            <CardBody>
                
            </CardBody>
        </>
  )
}
