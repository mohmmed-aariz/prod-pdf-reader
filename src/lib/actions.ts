"use server"

import prisma from "./db";
import bcryptjs from "bcryptjs";



// Actons for Agency

export async function  signup(name: string, username: string, passowrd: string){
    const hashPassword = await bcryptjs.hash(passowrd, 10);

    const userExists = await prisma.admin.findFirst({
        where: {
            username: username
        }
    })

    if(userExists){
        throw new Error("User with this email already exists");
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