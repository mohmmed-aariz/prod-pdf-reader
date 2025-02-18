"use client";

import { lusitana } from "@/app/ui/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { FormEvent, useActionState, useEffect, useState } from "react";
import { agencySignUp } from "@/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SigninForm() {
    const [username, setUsername] = useState<string | null>();
    const [password, setPassword] = useState<string | null>();
    const [error, setError] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false)
    // null in ts :: Explicit: Represents the intentional absence of any object value. Use Case: You explicitly assign null to a variable to indicate that it should be empty or hold no value.
    // undefined :: Default Value: If a variable is declared but not assigned a value, it is undefined by default. Use Case: Typically represents a variable that has been declared but not yet initialized, or the absence of a value for function parameters.


    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        const result = await signIn('credentials', {
            redirect: false,
            username,
            password,
            callbackUrl: "/agency"
        })

        setLoading(false);

        // const result = await signIn('UserTable', {
        //     redirect: true,
        //     username,
        //     password,
        //     callbackUrl: "/agency"
        // })
        console.log("result: ", result);

        if(result?.error){
            setError(result.error);
            // console.error(result.error);
        }  else {
            if(result?.url){
              console.log("Route redirect ", result.url)
              router.push(result?.url);// Redirects to the callbackUrl
            }
        }

        if(result?.ok == true){
          router.refresh();
        }
    }


 

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please Sign in to continue.
        </h1>
        <div className="w-full">

          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                onChange={(e) => {
                    setUsername(e.target.value)
                }}
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* <Button className="mt-4 w-full" aria-disabled={isPending}> */}
        <Button className="mt-4 w-full" type="submit" aria-disabled={loading}>
          Sign In <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

        <div className="mb-3 mt-5  text-xs font-medium text-gray-500 flex justify-center">
          <p>
            {/* If new user, go on to{" "} */}
            If not signed up, go on to{" "}
            <Link href={"/agency/signup"} className="font-bold underline">
              Signup page.{" "}
            </Link>
          </p>
        </div>

        <div
          className="flex items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {error && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{error}</p>
            </>
          )}
          
        </div>
      </div>
    </form>
  );
}
