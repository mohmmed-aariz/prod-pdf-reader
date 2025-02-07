"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DropdownAvatar({
  session,
}: {
  session: Session ;
}) {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownOpen &&
        !document
          .getElementById("user-menu-button")!
          .contains(event.target as Node) &&
        !document
          .getElementById("user-dropdown")!
          .contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <button
      type="button"
      className="relative flex text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      id="user-menu-button"
      aria-expanded={dropdownOpen ? "true" : "false"}
      // onClick={toggleDropdown}
      onMouseEnter={toggleDropdown}
      aria-controls="user-dropdown"
    >
      <span className="sr-only">Open user menu</span>
      {/* <img className="w-8 h-8 rounded-full" src="/tree.jpg" alt="user photo" /> */}
      {/* { session && session.user.image  ? (
                      <Image
                      src={session.user.image || ''}
                      className="rounded-full "
                      alt={`${session.user.name}'s profile picture`}
                      width={28}
                      height={28}
                      
                      />
                    ) : (
                        // how to check if the sesson.user.name is present or not
                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <span className="font-medium text-gray-600 dark:text-gray-300">{session.user.name?.charAt(0).toUpperCase() }</span>
                  </div>
                )} */}
{session && session.user.image ? (
  <Image
    src={session.user.image || ''}
    className="rounded-full "
    alt={`${session.user.name ? session.user.name : 'profile picture'}`}
    width={28}
    height={28}
  />
) : (
  session && session.user.name ? (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {session.user.name.charAt(0).toUpperCase()}
      </span>
    </div>
  ) : (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        N/A
      </span>
    </div>
    // <div>Login button</div>
  )
)}


      <div
        className={`absolute  top-5 right-2 mt-2 w-48 origin-bottom rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
          dropdownOpen ? "block" : "hidden"
        } z-50`}
        id="user-dropdown"
        onMouseLeave={closeDropdown}
        // onMouseEnter={toggleDropdown}
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 ">
            {session.user.name || ""}
          </span>
          <span className="block text-sm text-gray-500 truncate ">
            {/* name@flowbite.com */}
            {session.user.email}
          </span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          {/* <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600  dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600  dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600  dark:hover:text-white"
            >
              Earnings
            </a>
          </li> */}
          <li>
            <div
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600  dark:hover:text-white"
              onClick={()=>{
                signOut();
              }}
            >
              Sign out
            </div>
          </li>
        </ul>
      </div>
    </button>
  );
}
