import { lusitana } from "@/app/ui/fonts";
import { BookOpenIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export default function AppLogo() {
  return (
    <div
      // className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
      className={`${lusitana.className} flex flex-row items-center leading-none text-gray-100 font-bold`}

    >
      <GlobeAltIcon className="h-8 w-8 rotate-[15deg]" />
      {/* <svg className="w-8 text-deep-purple-accent-400" viewBox="0 0 24 24" strokeLinejoin="round" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" stroke="currentColor" fill="none">
          <rect x="3" y="1" width="7" height="12"></rect>
          <rect x="3" y="17" width="7" height="6"></rect>
          <rect x="14" y="1" width="7" height="6"></rect>
          <rect x="14" y="11" width="7" height="12"></rect>
        </svg> */}

      <p className="text-[26px] ">Logo</p>
    </div>
  );
}
