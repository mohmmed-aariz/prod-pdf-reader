 
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
        {/* <main className="bg-custom-gradient min-h-screen w-full">{children}</main> */}
        <main className="min-h-screen w-full bg-gradient-to-r from-gray-900 via-sky-900 to-slate-900">{children}</main>
      </>
    )
  }