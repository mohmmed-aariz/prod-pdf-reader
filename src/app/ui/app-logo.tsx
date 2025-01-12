import { lusitana } from "@/app/ui/fonts";
import { BookOpenIcon } from "@heroicons/react/24/outline";

export default function AppLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <BookOpenIcon className="h-12 w-12 rotate-[15deg]" />

      <p className="text-[44px]">Logo</p>
    </div>
  );
}
