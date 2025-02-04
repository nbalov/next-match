'use client'

import React from 'react'
import {CldUploadButton, CloudinaryUploadWidgetResults} from 'next-cloudinary'
import { HiPhoto } from 'react-icons/hi2'

type Props = {
    // define an upload function type
    onUploadImage: (result: CloudinaryUploadWidgetResults) => void
}

export default function imageUploadfButton({onUploadImage}: Props) {
    //signatureEndpoint end point for image signiture
    return (
    <CldUploadButton 
        options={{maxFiles: 1}}
        onSuccess={onUploadImage}
        signatureEndpoint='/sign-image'
        uploadPreset='nextmatch-demo'
        className={`flex items-center gap-2 border-2 bg-secondary text-white
            rounded-lg py-2 px-4 hover:bg-secondary/50`}
    >
        <HiPhoto size={28} />
            Upload new image
    </CldUploadButton>    
    )
}