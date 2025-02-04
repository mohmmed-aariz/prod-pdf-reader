import SideNav from "@/app/ui/agency/sidenav";

export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden  ">
      <div className="w-full flex-none md:w-64 ">
        <SideNav />
        {/* Side Nav */}
      </div>
      <div className="flex-grow p-4 md:overflow-y-auto md:p-12 ">{children}</div>
    </div>
  );
}