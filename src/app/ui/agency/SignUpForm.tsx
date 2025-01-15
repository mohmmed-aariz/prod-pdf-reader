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
import { useActionState, useEffect } from "react";
import { agencySignUp } from "@/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const initialState = {
    success: false,
    message: "",
  };
  const router = useRouter();

  const [data, formAction, isPending] = useActionState(
    agencySignUp,
    initialState
  );

  useEffect(()=>{
    if(data.success){
          if(data.success){
            router.push('/agency');
          }

    }
  }, [data])
 

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please Sign up to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

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
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Sign Up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

        <div className="mb-3 mt-5  text-xs font-medium text-gray-500 flex justify-center">
          <p>
            If already signed up, go on to{" "}
            <Link href={"/agency/signin"} className="font-bold underline">
              Login page.{" "}
            </Link>
          </p>
        </div>

        <div
          className="flex items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {data.message && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{data.message}</p>
            </>
          )}
          {data.success && !data.message && (
            <>
              <div className="flex justify-center  h-full w-full text-sm">
                <CheckCircleIcon className="h-5 w-5 text-blue-500 " />

                <p className="text-sm text-blue-500 ">
                  {" "}
                  Signed up successfully!{" "}
                </p>
                
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
