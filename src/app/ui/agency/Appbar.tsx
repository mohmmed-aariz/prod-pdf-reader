"use client"

import { signIn, signOut, useSession } from "next-auth/react";

export const Appbar = () => {
    
    const session = useSession();

    return <div>
            <div className="flex">
            {/* <div style={{ border: '2px solid white', padding: '10px', borderRadius: '5px' }}>
                <button onClick={()=>{
                    signIn();
                    // just call signIn over here, it will automatically take you to the signIn page
                }}>Signin</button>
            </div> */}
            {/* and it even gives us the benefit of adding logout button  */}
            {/* <div style={{ border: '2px solid white', padding: '10px', borderRadius: '5px' }}>
                <button onClick={()=>{
                    signOut();
                }}>Logout</button>
            </div> */}
        </div>
        <div>
            {JSON.stringify(session)}
            {/* currently we are returning a hard-coded user for every request */}
        </div>
    </div>
}

// "use client"

// import { signIn, signOut, useSession } from "next-auth/react";

// export const Appbar = () => {
    
//     const session = useSession();

//     return <div>
//             <div className="flex">
//             <div style={{ border: '2px solid white', padding: '10px', borderRadius: '5px' }}>
//                 <button onClick={()=>{
//                     signIn();
//                     // just call signIn over here, it will automatically take you to the signIn page
//                 }}>Signin</button>
//             </div>
//             {/* and it even gives us the benefit of adding logout button  */}
//             <div style={{ border: '2px solid white', padding: '10px', borderRadius: '5px' }}>
//                 <button onClick={()=>{
//                     signOut();
//                 }}>Logout</button>
//             </div>
//         </div>
//         <div>
//             {JSON.stringify(session)}
//             {/* currently we are returning a hard-coded user for every request */}
//         </div>
//     </div>
// }