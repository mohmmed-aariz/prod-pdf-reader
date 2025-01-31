import Link from "next/link";
import DropdownAvatar from "./dropdownAvatar";
import AppLogo from "../../app-logo";
import { getServerSession, Session } from "next-auth";
import { NEXT_AUTH } from "@/app/api/auth/[...nextauth]/options";


export default async function () {
      const session: Session | null = await getServerSession(NEXT_AUTH);
    
  return (
    <div className=" h-16 flex justify-center mx-6 lg:mx-8 bg-gray-900 rounded-b-lg px-2">

      <nav className="w-full flex justify-between py-4 mx-auto  xl:w-4/5 transition-all duration-500 border border-white">
        {/* <div className="max-w-screen-xl flex flex-row items-center justify-between mx-auto p-4"> */}
        <div className="flex flex-row border border-blue-400   ">
          {/* <div className="flex justify-center"><AppLogo /></div> */}
          {/* <div className="flex flex-col justify-center"> */}
            <Link href={"/user"}>
              <AppLogo />
            </Link>
            {/* <div className="text-white">Hello</div> */}
          {/* </div> */}
        </div>

        <div className="flex items-center md:order-2  rounded-md ">
            {session ? (
                <div>
                    <DropdownAvatar session={session} />
                </div>
            ) : (
                // <NavSignupButton />
                <div className={` flex flex-row items-center `}
                >
                    <Link href={'/register'}>
                    <button className="text-gray-200 border border-gray-500 hover:bg-gray-800 px-3 py-1 bg-slate-800 font-bold rounded-md hover:opacity-90	">
                        Sign In
                    </button>
                    </Link>
                </div>
            )}
        </div>
        {/* </div> */}
      </nav>

    </div>
  );
}
