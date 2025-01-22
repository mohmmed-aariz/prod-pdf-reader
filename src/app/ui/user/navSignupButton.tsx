import Link from "next/link";
import { lusitana } from "../fonts";

export default function NavSignupButton(){
    return (
        <div className={`${lusitana.className} flex flex-row items-center leading-none text-black`}
        >
            <Link href={'/agency/signin'}>
            <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg	">
                Sign In
            </button>
            </Link>
        </div>
    )
}