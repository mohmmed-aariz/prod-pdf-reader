"use server";

import prisma from "./db";
import bcryptjs from "bcryptjs";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/app/api/auth/[...nextauth]/options";

// Actons for Agency

export async function agencySignUp(
  currentState: { success: boolean; message: string },
  formData: FormData
) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  let count = 0;
  for (let i = 0; i < 10000000000; i++) {
    count++;
  }

  try {
    const hashPassword = await bcryptjs.hash(password, 10);

    const userExists = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (userExists) {
      return {
        success: false,
        message: "User already exists!",
      };
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        username: username,
        password: hashPassword,
        role: "AGENCY_USER"
      },
    });

    return {
      success: true,
      message: "",
    };
  } catch (error) {
    return {
      success: false,
      message: `An error occured while registering the user!`,
    };
  }
}

export async function getAgencyUser(){
  const session = await getServerSession(NEXT_AUTH);

  return session
}
