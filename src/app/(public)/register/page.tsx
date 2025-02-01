"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function () {
  const { data: session, status } = useSession();

  // const [dropdownOpen, setDropdownOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };

  // const closeDropdown = () => {
  //   setDropdownOpen(false);
  // };

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownOpen &&
  //       !document
  //         .getElementById("user-menu-button")!
  //         .contains(event.target as Node) &&
  //       !document
  //         .getElementById("user-dropdown")!
  //         .contains(event.target as Node)
  //     ) {
  //       setDropdownOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [dropdownOpen]);

  // const router = useRouter();
  // if (status === "authenticated") {
  //   router.push("/user");
  // }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = await signIn("google", {
      redirect: true,
      callbackUrl: "/user",
    });

    if (result?.error) {
      console.log(result.error);
    } else {
      // if (result?.url) {
      //   router.push(result?.url); // Redirects to the callbackUrl
      // }
    }
  };

  return (
    // <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8" >
    <div className="flex min-h-full flex-col justify-center px-6  lg:px-8 ">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 rounded-b-lg h-16">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center md:order-2 ">
            
          </div>
        </div>
      </nav>



      <div className=" sm:mx-auto sm:w-full sm:max-w-sm ">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  <form className="space-y-6" onSubmit={handleSubmit}>
    <div className="flex flex-col justify-center hover:border-slate-400 hover:shadow transition duration-150 rounded-lg">
      <div className="relative w-full">
        <Image
          className="w-full rounded-t-lg overflow-hidden"
          src="/tree.jpg"
          alt="Your Company"
          height={1080}
          width={1000}
          priority={true}
        ></Image>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center px-4 py-4 border gap-2 border-slate-800 rounded-b-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
      >
        <img
          className="w-6 h-6"
          src="/google.svg"
          loading="lazy"
          alt="google logo"
        />
        <span>Login with Google</span>
      </button>
    </div>
  </form>
  <p className="mt-10 text-center text-sm/6 text-gray-500">
    By continuing, you agree to our, Terms of Service & Privacy Policy
  </p>
</div>





      
    </div>
  );

  // "use client"

  // import {  signIn, useSession } from 'next-auth/react';
  // import Image from 'next/image';
  // import { useRouter } from 'next/navigation';
  // import { FormEvent, useEffect, useState } from 'react';

  // export default function() {
  //     const {data: session, status } = useSession();

  //     const [dropdownOpen, setDropdownOpen] = useState(false);

  //     const toggleDropdown = () => {
  //       setDropdownOpen(!dropdownOpen);
  //     };

  //     const closeDropdown = () => {
  //       setDropdownOpen(false);
  //     };

  //     useEffect(() => {
  //       const handleClickOutside = (event: MouseEvent) => {
  //         if (
  //           dropdownOpen &&
  //           !document.getElementById('user-menu-button')!.contains(event.target as Node) &&
  //           !document.getElementById('user-dropdown')!.contains(event.target as Node)
  //         ) {
  //           setDropdownOpen(false);
  //         }
  //       };

  //       document.addEventListener('mousedown', handleClickOutside);
  //       return () => {
  //         document.removeEventListener('mousedown', handleClickOutside);
  //       };
  //     }, [dropdownOpen]);

  //     const router = useRouter();
  //     if(status === 'authenticated'){
  //       router.push('/user')
  //     }

  //     const handleSubmit = async (e: FormEvent) => {
  //       e.preventDefault();

  //       const result = await signIn("google", {
  //         redirect: true,
  //         callbackUrl: '/user'
  //       })

  //       if(result?.error){
  //         console.log(result.error);
  //       } else {
  //         if(result?.url){
  //             router.push(result?.url);// Redirects to the callbackUrl
  //         }
  //     }

  //     }

  //     return (
  //         // <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8" >
  //         <div className="flex min-h-full flex-col justify-center px-6  lg:px-8 " >

  // <nav className="bg-white border-gray-200 dark:bg-gray-900 rounded-b-lg">
  //   <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  //     <div className="flex items-center md:order-2 ">

  //       <button
  //         type="button"
  //         className="relative flex text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
  //         id="user-menu-button"
  //         aria-expanded={dropdownOpen ? "true" : "false"}
  //         // onClick={toggleDropdown}
  //         onMouseEnter={toggleDropdown}
  //         aria-controls="user-dropdown"
  //       >
  //         <span className="sr-only">Open user menu</span>
  //         <img className="w-8 h-8 rounded-full" src="/tree.jpg" alt="user photo" />

  //         <div
  //         className={`absolute  top-5 mt-2 w-48 origin-bottom rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${dropdownOpen ? 'block' : 'hidden'} z-50`}
  //         id="user-dropdown"
  //         onMouseLeave={closeDropdown}
  //         // onMouseEnter={toggleDropdown}

  //       >
  //         <div className="px-4 py-3">
  //           <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
  //           <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
  //         </div>
  //         <ul className="py-2" aria-labelledby="user-menu-button">
  //           <li>
  //             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
  //               Dashboard
  //             </a>
  //           </li>
  //           <li>
  //             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
  //               Settings
  //             </a>
  //           </li>
  //           <li>
  //             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
  //               Earnings
  //             </a>
  //           </li>
  //           <li>
  //             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
  //               Sign out
  //             </a>
  //           </li>
  //         </ul>
  //       </div>

  //       </button>

  //     </div>
  //   </div>
  // </nav>

  // {/* <nav className="bg-white border-gray-200 dark:bg-gray-900">
  //   <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  //     <div className="flex items-center md:order-2">
  //       <button
  //         type="button"
  //         className="relative flex text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
  //         id="user-menu-button"
  //         aria-expanded={dropdownOpen ? "true" : "false"}
  //         onClick={toggleDropdown}
  //         aria-controls="user-dropdown"
  //       >
  //         <span className="sr-only">Open user menu</span>
  //         <img className="w-8 h-8 rounded-full" src="/tree.jpg" alt="user photo" />
  //       </button>

  //       <div
  //         className={`absolute top-10 mt-2 w-48 origin-bottom rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${dropdownOpen ? 'block' : 'hidden'} z-50`}
  //         id="user-dropdown"
  //       >
  //         <div className="px-4 py-3">
  //           <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
  //           <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
  //         </div>
  //         <ul className="py-2" aria-labelledby="user-menu-button">
  //           <li>
  //             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
  //               Dashboard
  //             </a>
  //           </li>
  //           <li>
  //             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
  //               Settings
  //             </a>
  //           </li>
  //           <li>
  //             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
  //               Earnings
  //             </a>
  //           </li>
  //           <li>
  //             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
  //               Sign out
  //             </a>
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   </div>
  // </nav> */}

  //           <div className=" sm:mx-auto sm:w-full sm:max-w-sm ">
  //             <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
  //               Sign in to your account
  //             </h2>
  //           </div>

  //           <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  //             <form className="space-y-6" onSubmit={handleSubmit} >
  //               {/* <div>
  //                 <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
  //                 <div className="mt-2">
  //                   <input type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
  //                 </div>
  //               </div> */}

  //               {/* <div>
  //                 <div className="flex items-center justify-between">
  //                   <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
  //                   <div className="text-sm">
  //                     <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
  //                   </div>
  //                 </div>
  //                 <div className="mt-2">
  //                   <input type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
  //                 </div>
  //               </div> */}

  //               <div className=' flex flex-col justify-center hover:border-slate-400 hover:shadow transition duration-150 rounded-lg'>
  //                 <div className='relative h-full w-full'>

  //                   <Image className="mx-auto  w-auto rounded-t-lg overflow-hidden" src="/tree.jpg" alt="Your Company" height={1080} width={1000} priority={true}></Image>
  //                 </div>

  //                   <button type='submit' className="sm:w-full flex justify-center px-4 py-4 border  gap-2 border-slate-800  rounded-b-lg text-slate-700  hover:border-slate-400  hover:text-slate-900  hover:shadow transition duration-150"
  //                     // onClick={()=>{signIn("google")}}
  //                   >
  //                       <img className="w-6 h-6" src="/google.svg" loading="lazy" alt="google logo" />
  //                       <span>Login with Google</span>
  //                   </button>
  //               </div>

  //               {/* <div>
  //                 <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
  //               </div> */}
  //             </form>

  //             <p className="mt-10 text-center text-sm/6 text-gray-500">
  //             By continuing, you agree to our, Terms of Service & Privacy Policy
  //             {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a> */}
  //             </p>
  //           </div>
  //         </div>
  //     )

  //     return <div>
  //     <div className="flex h-screen items-center justify-center ">
  //       <div className="flex justify-center p-2 border ">
  //         <div>
  //             <div className='flex justify-center font-medium	 text-xl mb-2'>
  //                 Signin Page
  //             </div>

  //             <div className='flex flex-col justify-center'>
  //                 <button onClick={async () => {
  //                     await signIn("google");
  //                     // await signIn("google", { redirect: false });
  //                     // router.push("/");
  //                 }}>Login with google</button>

  //                 {/* when you have different providers in your coustom page, just call signIn with right providers*/}

  //             </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
}

// "use client"

// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// export default function() {
//     const router = useRouter();

//     return (
//         <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
//   <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//     <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
//     <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
//   </div>

//   <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//     <form className="space-y-6" action="#" method="POST">
//       <div>
//         <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
//         <div className="mt-2">
//           <input type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
//         </div>
//       </div>

//       <div>
//         <div className="flex items-center justify-between">
//           <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
//           <div className="text-sm">
//             <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
//           </div>
//         </div>
//         <div className="mt-2">
//           <input type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
//         </div>
//       </div>

//       <div>
//         <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
//       </div>
//     </form>

//     <p className="mt-10 text-center text-sm/6 text-gray-500">
//       Not a member?
//       <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
//     </p>
//   </div>
// </div>
//     )

// //     return <div>
// //     <div className="flex h-screen items-center justify-center ">
// //       <div className="flex justify-center p-2 border ">
// //         <div>
// //             <div className='flex justify-center font-medium	 text-xl mb-2'>
// //                 Signin Page
// //             </div>

// //             <div className='flex flex-col justify-center'>
// //                 <button onClick={async () => {
// //                     await signIn("google");
// //                     // await signIn("google", { redirect: false });
// //                     // router.push("/");
// //                 }}>Login with google</button>

// //                 {/* when you have different providers in your coustom page, just call signIn with right providers*/}

// //             </div>
// //         </div>
// //       </div>
// //     </div>
// //   </div>

// }
// // after making your own custom page remember ot add pages to auth.ts
