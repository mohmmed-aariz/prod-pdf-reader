import Link from "next/link";
import { lusitana } from "../fonts";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";

export default async function NavSignupButton(){
    const session = await getServerSession(NEXT_AUTH);

    if(!session){
        return (
            <div className={`${lusitana.className} flex flex-row items-center leading-none text-black`}
            >
                <Link href={'/register'}>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded-lg	">
                    Sign In
                </button>
                </Link>
            </div>
        )
    }
    else {
        return (
            <div className={`${lusitana.className} flex flex-row items-center leading-none text-black`}
            >
                {!session.user.image  ? (
                <Image
                src={session.user.image || ''}
                className="rounded-full "
                alt={`${session.user.name}'s profile picture`}
                width={28}
                height={28}
                
                />
              ) : (<div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">{session.user.name?.charAt(0).toUpperCase()}</span>
            </div>)}

            

                
            </div>
        )
    }
}