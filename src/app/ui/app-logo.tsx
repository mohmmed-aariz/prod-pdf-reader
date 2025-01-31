import { lusitana } from "@/app/ui/fonts";
import { BookOpenIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export default function AppLogo() {
  return (
    <div
      // className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
      className={`${lusitana.className} flex flex-row items-center leading-none text-gray-300 font-bold`}

    >
      <GlobeAltIcon className="h-8 w-8 rotate-[15deg]" />

      <p className="text-[26px] ">Logo</p>
    </div>
  );
}
