'use server';

import { auth } from '../../auth';
import {prisma} from '../../lib/prisma';

export async function getMembers() {

    // get the user session from everywhere using auth()
    const session = await auth();
    if (!session?.user) return null;

    //throw new Error('testing...')

    try {
        return prisma.member.findMany({
            where: {
                NOT: {
                    userId: session.user.id
                }
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}

export async function getMemberByUserId(userId: string) {
    try {
        return prisma.member.findUnique({where: {userId}})
    }
    catch (error) {
        console.log(error);
    }
}

export async function getMemberPhotosByUserId(userId: string) {
    const member = await prisma.member.findUnique({
        where: {userId},
        select: {photos: true}
    })
    if (!member) return null;
    return member.photos.map(p => p);
}