import React from 'react'
import {getMemberPhotosByUserId} from '@/app/actions/memberActions'
import { CardHeader, CardBody} from '@heroui/card'
import { Divider} from '@heroui/divider'
import { Image} from '@heroui/image'

export default async function PhotoPage({params}: {params: {userId: string}}) {
    const photos = await getMemberPhotosByUserId(params.userId);
    return (
    <>
        <CardHeader className='text-2xl font-semibold text-secondary'>
                Photos
            </CardHeader>
            <Divider />
            <CardBody>
                <div className='grid grid-cols-5 gap-5'>
                    {photos && photos.map(photo => (
                        <div key={photo.id}>
                            <Image 
                                width = {300}
                                height = {300}
                                src={photo.url}
                                alt='Image of member'
                                className='object-cover aspect-square'
                            />
                        </div>
                    ))
                    }
                </div>
            </CardBody>
        </>
  )
}
