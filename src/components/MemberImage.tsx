'use client'

import React from 'react'
import {Photo} from '@prisma/client'
import { CldImage } from 'next-cloudinary';
import { Image } from '@heroui/image'

type Props = {
    photo: Photo | null;
}

export default function MemberImage({photo}: Props) {
    // priority property is needed to get rid of warning
    // about Largest Contentful Paint (LCP) of an image
    return (
    <div>
        {photo?.publicId ? (
            <CldImage 
                alt='Image of member'
                src={photo.publicId}
                width={300}
                height={300}
                crop='fill'
                gravity='faces'
                className='rounded-2xl'
                priority
            />
        ) : (
             <Image 
                    width={220}
                    src={photo?.url || '/images/user.png'}
                    alt='Image of user'
                    className='object-cover aspect-square'
                />
        )}
    </div>
    )
}
