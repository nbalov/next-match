import React from 'react';
import { getMembers } from '../actions/memberActions';
import MemberCard from './MemberCard';
import { fetchCurrentUserLikeIds } from '../actions/likeActions';

export default async function MembersPage() {
    const members = await getMembers();
    const likeIds = await fetchCurrentUserLikeIds();
    // md: median screen size, lg: large screen size, xl: extra large screen size
    // sm: by default, mobile
    return (
        <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-8'>
            {members && members?.map(member => 
                <MemberCard key={member.id} member={member} likeIds={likeIds}/>
            )}
        </div>
    )
}