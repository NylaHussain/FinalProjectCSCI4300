'use server'

import { signIn, signOut } from "../../auth";

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData: FormData): Promise<any> {
  // Convert FormData to a plain object
  const email = formData.get("email") as string; 
  const password = formData.get("password") as string; 

  try {
    // Send login credentials as a plain object
    const response = await signIn("credentials", {
        email,
        password,
        redirect: false, // Don't redirect automatically, let the front-end handle it
    });

    // Return the response for further handling
    return response;
  } catch (err: any) {
    // Handle errors
    throw err;
  }
}
