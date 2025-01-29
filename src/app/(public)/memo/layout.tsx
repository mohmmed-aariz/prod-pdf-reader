 
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
        {/* <main className="bg-custom-gradient min-h-screen w-full">{children}</main> */}
        <main className="min-h-screen w-full">{children}</main>
      </>
    )
  }