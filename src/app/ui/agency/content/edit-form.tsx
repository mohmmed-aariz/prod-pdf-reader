"use client"

import { CheckIcon, ClockIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "../../button";
import { updateDocument } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function EditDocumentForm({
    document
}: {
    document: {
        id: string,
        title: string ,
        description: string | null,
        coverImageUrl: string | null,
        pdfAppUrl: string,
        hide: boolean
    }
}) {
  const initialState = {
    success: false,
    message: "",
  };
    const router = useRouter();

      const [data, formAction, isPending] = useActionState(
        updateDocument,
        initialState
      );
    
      useEffect(()=>{
        if(data.success){
              if(data.success){
                router.push('/agency/content');
              }
    
        }
      }, [data])
     
  
    return (
        <form action={formAction}>

          <div className="rounded-md bg-gray-50 p-4 md:p-6">
            
            {/* adding id to the formData */}
            <input type="hidden" name="id" value={document.id} />

            {/* File Name */}
            <div className="mb-4">
              <label htmlFor="fileName" className="mb-2 block text-sm font-medium">
                File Name
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="fileName"
                    name="fileName"
                    type="text"
                    defaultValue={document.title}
                    placeholder="Enter File Name"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  />
                  <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>

            {/* File Description */}
            <div className="mb-4">
              <label htmlFor="fileDescription" className="mb-2 block text-sm font-medium">
                File Name
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="fileDescription"
                    name="fileDescription"
                    type="text"
                    defaultValue={document.description || ''}
                    placeholder="Enter File Description"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  />
                  <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>
    
    
            {/* Invoice Amount */}
            {/* <div className="mb-4">
              <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                Choose an amount
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    defaultValue={invoice.amount}
                    placeholder="Enter USD amount"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  />
                  <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div> */}
    
            {/* Document Status */}
            <fieldset>
              <legend className="mb-2 block text-sm font-medium">
                Set the Document visibility status
              </legend>
              <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <input
                      id="hidden"
                      name="status"
                      type="radio"
                      value="hidden"
                      defaultChecked={document.hide === true}
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <label
                      htmlFor="hidden"
                      className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                    >
                      hidden <ClockIcon className="h-4 w-4" />
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="visible"
                      name="status"
                      type="radio"
                      value="visible"
                      defaultChecked={document.hide === false}
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <label
                      htmlFor="visible"
                      className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                    >
                      visible <CheckIcon className="h-4 w-4" />
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/agency/content"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <Button type="submit" aria-disabled={isPending}>Edit Invoice</Button>
          </div>
        </form>
      );
}