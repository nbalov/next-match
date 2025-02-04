import { auth } from "@/auth";
import { Button} from "@heroui/button";
import { FaRegSmile } from "react-icons/fa";
import {signOut} from '@/auth'

export default async function HomePage() {
    // access session info on the server side using auth()
    const session = await auth();

    return (
    <div>
        <h3 className='text-2xl font-semibold'>User session data:</h3>
        {session ? (
        <div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <form action={async () => {
            'use server'
            await signOut();
            }}>
              <Button 
                  type='submit'
                  color='primary' 
                  variant='bordered' 
                  startContent={<FaRegSmile size={20}>
                  </FaRegSmile>}>
                  Sign out
              </Button>
            </form>
        </div>
        ) : (
        <div>Not signed in</div>
        )}
    </div>
    );
}