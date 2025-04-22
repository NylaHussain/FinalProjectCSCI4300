/*
//new
"use client";
import Link from "next/link";
import { doCredentialLogin } from "../app/actions";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const response = await doCredentialLogin(formData);

      if (response?.error) {
        console.error(response.error);
        setError(response.error || "An error occurred");
      } else {
        router.push("/welcome");
      }
    } catch (e: any) {
      console.error(e);
      setError("Check your Credentials");
    }
  }

  return (
    <div className='ShowItemList'>
    <div className="grid mt-8 justify-items-center"> 
      <div className="shadow-lg p-5 rounded-lg border-t-4 bg-white border-red-700">
       <h1 className="text-xl text-slate-600 font-bold my-4">Login</h1>
      {error && <div className="text-lg text-red-500">{error}</div>}
      <form
  onSubmit={onSubmit}
  className="my-8 max-w-md mx-auto flex flex-col gap-4 border p-6 border-gray-300 rounded-md shadow-sm bg-white"
>
  <div className="flex flex-col">
    <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
      Email Address
    </label>
    <input
      className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
      type="email"
      name="email"
      id="email"
      placeholder="Email"
      required
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
      Password
    </label>
    <input
      className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
      type="password"
      name="password"
      id="password"
      placeholder="Password"
      required
    />
  </div>

  <button
    type="submit"
    className="bg-red-700 text-white rounded px-4 py-2 mt-2 hover:bg-red-800 transition"
  >
    Login
  </button>
</form>

      <p className="my-3 text-center">
        Don't you have an account?
        <Link href="/signup" className="mx-2 underline">Signup</Link>
      </p>
    </div>
    </div>
    </div>
  );
};

export default LoginForm;



import { useState } from "react";
import { useRouter } from "next/router";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const response = await fetch("/api/items/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.message === "Login successful") {
        // Store token in cookies
        document.cookie = `token=${data.token}; path=/; max-age=3600; Secure; HttpOnly; SameSite=Strict`;
        router.push("/welcome"); // Redirect to welcome page
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (e: any) {
      setError("An error occurred during login.");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;


//test WORKS
"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    try {
    const formData = new FormData(event.currentTarget);
    const userData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

      const response = await fetch('/api/items/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.message === "Login successful") {
        router.push('/welcome');  // Redirect to dashboard or protected page
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (e) {
      setError("An error occurred during login.");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
*/

//tut

"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/items/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.message === "Login successful") {
        router.push("/welcome");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (e) {
      console.error("Login error:", e);
      setError("An error occurred during login.");
    }
  }

  return (
    <div className="shadow-lg p-5 rounded-lg border-t-4 bg-white border-red-700 w-full max-w-md">
      <h1 className="text-xl text-slate-600 font-bold my-4 text-center">Login</h1>
      {error && <p className="text-lg text-red-500 text-center">{error}</p>}
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">Email Address</label>
          <input
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-red-700 text-white rounded px-4 py-2 mt-2 hover:bg-red-800 transition"
        >
          Login
        </button>
      </form>

      <p className="my-3 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="mx-2 underline text-blue-600">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
