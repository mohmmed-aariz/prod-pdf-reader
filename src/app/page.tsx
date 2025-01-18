import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "./api/auth/[...nextauth]/options";
import { LoginButton, LogoutButton } from "./ui/auth";
import { User } from "./ui/user";

export default async function Home() {
  const session = await getServerSession(NEXT_AUTH);
  return (
    <div>

      <LoginButton />
      <LogoutButton />
      <div>
        Hello, world
      </div>
      <h2>Server call</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client call</h2>
      <User />
    </div>
  )
}


// import { getServerSession } from "next-auth"
// import { NEXT_AUTH } from "./api/auth/[...nextauth]/options"

// export default async function Home() {
//   const session = await getServerSession(NEXT_AUTH);

//   return (
//     <div>
//       Landing Page
//       <pre>{JSON.stringify(session)}</pre>
//     </div>
//   )
// }
