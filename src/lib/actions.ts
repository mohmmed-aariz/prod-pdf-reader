"use server"

import { FormStatus } from "react-dom";
import prisma from "./db";
import bcryptjs from "bcryptjs";
import { error } from "console";






// Actons for Agency

// export async function  signup(name: string, username: string, passowrd: string){
export async function  signup(name: any, username: any, password: any){

    const hashPassword = await bcryptjs.hash(password, 10);

    const userExists = await prisma.admin.findFirst({
        where: {
            username: username
        }
    })

    if(userExists){
        // throw new Error("User with this email already exists");
        return {error: "User with this email already exists"}
    }

    try {
        const user = await prisma.admin.create({
            data: {
                name: name,
                username: username,
                password: hashPassword
            }
        })

        console.log(user);
        
        return user
    } catch (error) {
        console.log(error);
    }

    return null
}


// export async function agencySignUp(previousState: unknown, formData: FormData){
//     try {
//         const username = formData.get("username") as string; 
//         const password = formData.get("password") as string;
//         const name = formData.get("name") as string; 

//         
        
//         // await wait(1000);;
//         let count = 0;
//         for(let i = 0; i<10000000000; i++){
//             count++;
//         }

//         const res =  await signup(name, username, password)
        
//         // const res = {username, password, count};
//         // console.log(res);

        
    
//         return {res};
        
//     } catch (error: any) {
//     // if (error) {
//     //     switch (error) {
//     //         case 'CredentialsSignin':
//     //             return 'Invalid credentials.';
//     //         default:
//     //             return 'Something went wrong.';
//     //         }
//     //     }
//     // throw new Error(error);
//     return {error: error}
//     }
// }



// export async function agencySignUp(previousState: unknown, formData: FormData){
    
//     let count = 0;
//     for(let i = 0; i<10000000000; i++){
//         count++;
//     }
    
//     try {
//         const username = formData.get("username") as string; 
//         const password = formData.get("password") as string;
//         const name = formData.get("name") as string; 

//         const hashPassword = await bcryptjs.hash(password, 10);

//         const userExists = await prisma.admin.findFirst({
//             where: {
//                 username: username
//             }
//         })
        
//         try {
//             if(userExists){
//                 console.log("error as user exists");
//                 throw new Error("User with this email already exists");
//                 // return {error: "User with this email already exists"}
//             }

//             console.log("adding user to db")

//             const user = await prisma.admin.create({
//                 data: {
//                     name: name,
//                     username: username,
//                     password: hashPassword
//                 }
//             })

//             console.log(user);
            
//             return user;
//         } catch (error) {
//             console.log("error inside cache statement ", error);            

//             // throw new Error("User with this email already exists");

//         }

//         return null
        
//         // await wait(1000);;

//         const res =  await signup(name, username, password)
        
//         // const res = {username, password, count};
//         // console.log(res);

        
    
//         return {res};
        
//     } catch (error: any) {
//     // if (error) {
//     //     switch (error) {
//     //         case 'CredentialsSignin':
//     //             return 'Invalid credentials.';
//     //         default:
//     //             return 'Something went wrong.';
//     //         }
//     //     }
//     // throw new Error(error);
//     return {error: error}
//     }
// }

// export async function agencySignUp(previousState: unknown, formData: FormData) {
//     let count = 0;
//     for(let i = 0; i<10000000000; i++){
//         count++;
//     }
//     try {
//       const username = formData.get("username") as string;
//       const password = formData.get("password") as string;
//       const name = formData.get("name") as string;
  
//       const hashPassword = await bcryptjs.hash(password, 10);
  
//       const userExists = await prisma.admin.findFirst({
//         where: {
//           username: username,
//         },
//       });
  
//       if (userExists) {
//         throw new Error("User with this username already exists");
//       }
  
//       const user = await prisma.admin.create({
//         data: {
//           name: name,
//           username: username,
//           password: hashPassword,
//         },
//       });
  
//       if(user){
//           return user;
//       } else{
//         return {error: "something went wrong!"}
//       }
  
//     } catch (error) {
//       console.error("Error during agencySignUp:");
//       return { error: (error as Error).message }; 
//     }

//   }

// type Fields = {
//   name: string,
//   username: string,
//   password: string
// }

// type FormState = {
//   message: string,
//   // errors: Record<keyof Fields, string> | undefined;
//   errors?: string | undefined,
//   fieldValues: Fields
// }

// export async function agencySignUp(previousState: FormState, formData: FormData) {
 export async function agencySignUp( currentState: {success: boolean, message: string}, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

    let count = 0;
    for(let i = 0; i<10000000000; i++){
        count++;
    }

    try {
      const hashPassword = await bcryptjs.hash(password, 10);
  
      const userExists = await prisma.admin.findFirst({
        where: {
          username: username,
        },
      });
  
      if (userExists) {
        return { 
          success: false,
          message: "User already exists!" 
        }
      }
  
      const user = await prisma.admin.create({
        data: {
          name: name,
          username: username,
          password: hashPassword,
        },
      }); 
      
      return {
        success: true,
        message: ""
      }
  
    } catch (error) {
      return {
        success: false,
        message: `An error occured while registering the user!`
      }
    }

  }

// export async function agencySignUp(previousState: FormState, formData: FormData) {
//   const username = formData.get("username") as string;
//   const password = formData.get("password") as string;
//   const name = formData.get("name") as string;

//     let count = 0;
//     for(let i = 0; i<10000000000; i++){
//         count++;
//     }
//     try {
//       const hashPassword = await bcryptjs.hash(password, 10);
  
//       const userExists = await prisma.admin.findFirst({
//         where: {
//           username: username,
//         },
//       });
  
//       if (userExists) {
//         return null
//         }
  
//       const user = await prisma.admin.create({
//         data: {
//           name: name,
//           username: username,
//           password: hashPassword,
//         },
//       });
  
//       if(user){
//           return user;
//       } else{
//         return null
//       }
  
//     } catch (error) {
//       console.error("Error during agencySignUp:");
//       return null 
//     }

//   }
  


// export async function agencySignUpFunc({name, username, password}: {name:string, username: string, password: string}){

//     const hashPassword = await bcryptjs.hash(password, 10);

//     const userExists = await prisma.admin.findFirst({
//         where: {
//             username: username
//         }
//     })

//     if(userExists){
//         // throw new Error("User with this email already exists");
//         return {error: "User with this email already exists"}
//     }

//     try {
//         const user = await prisma.admin.create({
//             data: {
//                 name: name,
//                 username: username,
//                 password: hashPassword
//             }
//         })

//         console.log(user);
        
//         return user
//     } catch (error) {
//         console.log(error);
//         return {error: error};
//     }

//     return null
// }

