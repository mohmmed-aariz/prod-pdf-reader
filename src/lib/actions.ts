"use server";

import { FormStatus } from "react-dom";
import prisma from "./db";
import bcryptjs from "bcryptjs";
import { error } from "console";

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

    const userExists = await prisma.admin.findFirst({
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

    const user = await prisma.admin.create({
      data: {
        name: name,
        username: username,
        password: hashPassword,
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
