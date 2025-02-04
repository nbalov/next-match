'use client'

// components in Next.js are server-side by default
// and it is recommended to keep them server-side for performance
// however, here we need a client-side component

import React from 'react'
import Link from 'next/link'
import { NavbarItem} from '@heroui/navbar'
import {usePathname} from 'next/navigation'

type Props = {
    href: string;
    label: string;
}

export default function NavLink({href, label}: Props) {
    // use usePathname hook
    const pathname = usePathname();
    return (
        <NavbarItem isActive={pathname===href} as={Link} href={href}>{label}</NavbarItem>
    )
}
