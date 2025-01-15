import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "./api/auth/[...nextauth]/options"

export default async function Home() {
  const session = await getServerSession(NEXT_AUTH);

  return (
    <div>
      Landing Page
      <pre>{JSON.stringify(session)}</pre>
    </div>
  )
}
