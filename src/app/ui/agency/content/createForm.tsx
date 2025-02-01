'use client';

import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentDuplicateIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
// import { createInvoice, State } from '@/app/lib/actions';
import { useActionState, useEffect } from 'react';
import FileUploadButton from './FileUploadButton';
import { UploadButton, UploadDropzone } from '@/utils/uploadthing';
import { uploadFileAndPages } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function Form() {
  const initialState = {
    success: false,
    message: "",
  };
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(uploadFileAndPages, initialState);

    useEffect(()=>{
      if(state.success){
          if(state.success){
            router.push('/agency/content');
          }
      }
    }, [state])

  // return (
    // <form action={createInvoice}>
    return ( <form action={formAction} aria-disabled={isPending}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Choose File */}
        <div className="mb-4">
          <label htmlFor="files" className="mb-2 block text-sm font-medium">
            Upload file
          </label>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex   items-center">
              <input name='files' type='file' accept="application/pdf" />
            
            {/* <UploadDropzone
                    endpoint="pdfUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res);
                      alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                    
                  /> */}
            </div>
            <div id="files-error" aria-live='polite' aria-atomic="true">
            {/* {state.errors?.status && state.errors.status.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))} */}
          </div>
          </div>
     
          <div id="customer-error" aria-live='polite' aria-atomic="true">
            {/* {state.errors?.customerId && state.errors.customerId.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))} */}
          </div>
        </div>

        

        {/* File name */}
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
                placeholder="Enter File Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby='customer-error'
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="customer-error" aria-live='polite' aria-atomic="true">
              {/* {state.errors?.amount && state.errors.amount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))} */}
            </div>
          </div>
        </div>

        {/* File description */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium ">
            File Description
            <p className='text-stone-600'>(optional)</p>
          </label>
          
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="fileDescription"
                name="fileDescription"
                type="text"
                placeholder="Enter File Description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // required
                aria-describedby='customer-error'
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="customer-error" aria-live='polite' aria-atomic="true">
              {/* {state.errors?.amount && state.errors.amount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))} */}
            </div>
          </div>
        </div>

        {/* Choose cover image */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Cover Image
          </label>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex   items-center">
              {/* <input name='files' type='file' /> */}
              <input  name="coverImg" type="file" accept="image/*"/>
           
            </div>
            <div id="customer-error" aria-live='polite' aria-atomic="true">
            {/* {state.errors?.status && state.errors.status.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))} */}
          </div>
          </div>
     
          <div id="customer-error" aria-live='polite' aria-atomic="true">
            {/* {state.errors?.customerId && state.errors.customerId.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))} */}
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set file status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="hide"
                  name="status"
                  type="radio"
                  value="hide"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="hide"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Hide <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="visible"
                  name="status"
                  type="radio"
                  value="visible"
                  defaultChecked
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="visible"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Visible <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
            <div id="customer-error" aria-live='polite' aria-atomic="true">
            {/* {state.errors?.status && state.errors.status.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))} */}
          </div>
          
          </div>
        </fieldset>
        
      </div>
      <div className="mt-6 flex justify-between gap-4">

      <div id="customer-error" aria-live='polite' aria-atomic="true">
        {isPending && <div className='flex flex-row ml-4 gap-2'>
            <ExclamationCircleIcon className='h-5 w-5' /> 
            <p className=' text-sm text-gray-500'>
              Uploading the file will take a few minutes. Please wait until the upload is complete.
            </p>
          </div>}
      </div>

      <div className='flex flex-row gap-4'>
              <Link
                href="/agency/content"
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
              >
                Cancel
              </Link>

              <Button type='submit' aria-disabled={isPending}>
                Add Content
              </Button>

      </div>

        {/* <Button type="submit">Add Content</Button> */}
      </div>
    </form>
  );
}
