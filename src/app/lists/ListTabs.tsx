'use client'

import React from 'react'

import {Member} from '@prisma/client'
import { Tabs, Tab } from '@heroui/react';
import {useSearchParams, useRouter, usePathname} from 'next/navigation'
import MemberCard from '../members/MemberCard';

type Props = {
    members: Member[];
    likeIds: string[]
}

type Key = string | number | bigint

export default function ListTabs({members, likeIds}: Props) {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const tabs = [
        {id: 'source', label: 'Members I have liked'},
        {id: 'target', label: 'Members that have liked me'},
        {id: 'mutual', label: 'Mutual likes'},
    ]

    function handleTabChange(key: Key) {
        // type is passed to lists.page.tsx as search params
        // search params are `?${params.toString()}`
        const params = new URLSearchParams(searchParams);
        params.set('type', key.toString());
        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className='flex w-full flex-col mt-10 gap-5'>
        <Tabs 
            aria-label='Like tabs' 
            items={tabs}
            color='secondary'
            onSelectionChange={(key) => handleTabChange(key)}>
                {(item) => (
                    <Tab key={item.id} title={item.label}>
                        {members.length > 0 ? 
                        (<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-8'>
                            {members.map(member => (
                                <MemberCard key={member.id} member={member} likeIds={likeIds} />
                            ))}
                        </div>) : 
                        (<div>No members for this filter</div>)}
                    </Tab>
                )}
        </Tabs>
        </div>
    )
}
