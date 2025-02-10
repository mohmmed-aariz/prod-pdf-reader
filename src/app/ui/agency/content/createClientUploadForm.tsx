'use client';

import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentDuplicateIcon,
  ExclamationCircleIcon,
  TrashIcon,
  UserCircleIcon,
  ViewfinderCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
// import { createInvoice, State } from '@/app/lib/actions';
import { useActionState, useEffect, useState } from 'react';
import FileUploadButton from './FileUploadButton';
import { UploadButton, UploadDropzone } from '@/utils/uploadthing';
import { uploadFileAndPages } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { removeImage, removePdf, uploadFileAndPagesClientSide } from '@/lib/agencyActions';

export default function ClientUploadForm() {
  const initialState = {
    success: false,
    message: "",
  };

  const [docUrl, setDocUrl] = useState<string>('');
  const [docAppUrl, setDocAppUrl] = useState<string>('');
  const [docKey, setDocKey] = useState<string>("");
  const [docSize, setDocSize] = useState<number>(0);

  const [coverImgUrl, setCoverImgUrl] = useState<string>("");
  const [coverImgKey, setCoverImgKey] = useState<string>("");

  const router = useRouter();
  const [state, formAction, isPending] = useActionState(uploadFileAndPagesClientSide, initialState);

    useEffect(()=>{
      if(state.success){
          if(state.success){
            router.push('/agency/content');
          }
      }
    }, [state])

  
    const openPdf = () => {
      window.open(docAppUrl, '_blank');
    }

    const handlePdfRemove =  async () => {
      const res = await removePdf(docKey);
      console.log("Remove pdf");
      
      if(res?.success){
        setDocUrl("");
        setDocAppUrl("");
        setDocKey("")
        setDocSize(0);
      }
      
    }

    const handleImageRemove =  async () => {
      const res = await removeImage(coverImgKey);
      console.log("Remove Image");
      
      if(res?.success){
        setCoverImgKey("");
        setCoverImgUrl("");
      }
      
    }

  // return (
    // <form action={createInvoice}>
    return ( <form action={formAction} >

    <input type="hidden" name="docUrl" value={docUrl} />
    <input type="hidden" name="docAppUrl" value={docAppUrl} />
    <input type="hidden" name="docKey" value={docKey} />
    <input type="hidden" name="docSize" value={docSize} />

    <input type="hidden" name="coverImageUrl" value={coverImgUrl} />
    <input type="hidden" name="coverImageKey" value={coverImgKey} />


      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Choose File */}
        <div className="mb-4">
          <label htmlFor="files" className="mb-2 block text-sm font-medium">
            Upload file
          </label>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex  flex-row justify-between items-center w-full lg:w-2/3 xl:w-1/2  transition-all delay-75 duration-500">
              {/* <input name='files' type='file' accept="application/pdf" /> */}
            
            {/* <UploadButton
                    endpoint="pdfUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res);
                      setDocUrl(res[0].url);
                      setDocAppUrl(res[0].appUrl);
                      setDocKey(res[0].key);
                      setDocSize(res[0].size);
                      alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                    
                  /> */}

              <div className=' w-full max-w-[450px] justify-between gap-2'>
                {/* <h1>
                  Pdf Preview Button
                </h1> */}
                {
                  docUrl ? (
                    <div className=' flex justify-between'>
                      {/* <img src={coverImgUrl} alt="Fetched from UploadThing" height={"200px"} width={"200px"} /> */}
                      {/* <Link href={coverImgUrl} >Open Pdf</Link> */}
                      <button className="bg-blue-500 hover:bg-blue-600 text-white  py-2 px-4 rounded text-sm flex flex-row gap-2 items-center"  onClick={openPdf}><ViewfinderCircleIcon className='h-5 w-5 ' />Open File</button>
                      <button className="bg-blue-400 hover:bg-blue-500 text-white  py-3 px-4 rounded text-sm flex flex-row gap-2 items-center"  onClick={handlePdfRemove}>
                        <TrashIcon className='w-5 h-5' /> Remove Pdf</button>
                    </div>
                  ) : (
                    <div className='flex justify-start px-2 items-center'>
                    <UploadButton
                    endpoint="pdfUploader"
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log("Files: ", res);
                      setDocUrl(res[0].url);
                      setDocAppUrl(res[0].appUrl);
                      setDocKey(res[0].key);
                      setDocSize(res[0].size);
                      alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                    
                  />
                  </div>
                  )
                }
              </div>
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
          <label htmlFor="fileDescription" className="mb-2 block text-sm font-medium ">
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
          <div className="flex  flex-row justify-between items-center w-full lg:w-2/3  xl:w-1/2  transition-all delay-75 duration-500 ">
          {/* <input name='files' type='file' /> */}
              {/* <input  name="coverImg" type="file" accept="image/*"/> */}
              {/* <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res)=>{
                    console.log("Image res: ", res);

                    setCoverImgUrl(res[0].appUrl);
                    setCoverImgKey(res[0].key)
                }}

                onUploadError={(error) => {
                    alert(`ERROR! ${error}`);
                }}
            /> */}
            <div className=' w-full max-w-[450px]'>
                {/* <h1>
                  Image Preview
                </h1> */}
                {
                  coverImgUrl ? (
                    // <div className='h-[141.5px] w-[100px]'>
                    <div className='h-[141.5px]  w-full rounded-lg overflow-hidden flex flex-row items-center justify-between'>
                      {/* <button >Remove Image</button> */}
                      <div>
                        <img src={coverImgUrl} alt="Fetched from UploadThing" height={"141.5px"} width={"100px"} className='rounded-lg' />
                      </div>
                      <button 
                      className="bg-blue-400 hover:bg-blue-500 text-white  py-3 px-4 rounded text-sm flex flex-row gap-2 " 
                      onClick={handleImageRemove}>
                        <TrashIcon className='w-5 h-5' />
                      Remove Image
                      </button>
                    </div>
                    
                  ) : (
                    <div className='flex justify-start px-2 items-center'>

                    <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res)=>{
                        console.log("Image res: ", res);
    
                        setCoverImgUrl(res[0].appUrl);
                        setCoverImgKey(res[0].key)
                    }}
    
                    onUploadError={(error) => {
                        alert(`ERROR! ${error}`);
                    }}
                    />
                    </div>
                  )
                }
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

              <Button type='submit' aria-disabled={isPending }>
                Add Content
              </Button>

      </div>

        {/* <Button type="submit">Add Content</Button> */}
      </div>
    </form>
  );
}
