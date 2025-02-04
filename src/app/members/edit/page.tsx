// this is server component
import React from 'react'
import {getAuthUserId} from '@/app/actions/authActions'
import {getMemberByUserId} from '@/app/actions/memberActions'
import {notFound} from 'next/navigation'
import { CardHeader, CardBody, } from '@heroui/card'
import { Divider } from '@heroui/divider'
import EditForm from './EditForm'

//{params}: {params: {userId: string}}
export default async function MemberEditPage() {
  
  const userId = await getAuthUserId()
  const member = await getMemberByUserId(userId)
  if (!member) return notFound()

  return (
    <>
        <CardHeader className='text-2xl font-semibold text-secondary'>
            Edit Profile
        </CardHeader>
        <Divider />
        <CardBody>
            <EditForm member={member}/>
        </CardBody>
    </>
  )
}
