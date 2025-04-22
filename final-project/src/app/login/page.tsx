/*
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await fetch("/api/items/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Redirect to welcome page on success
      router.push("/welcome");
    } else {
      setError(data.message || "Login failed");
    }
  }

  return (
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
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="mx-2 underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

*/

//tutorial
"use client";

import LoginForm from "../../components/loginForm";

export default function LoginPage() {
  return (
    <div className="grid mt-8 justify-items-center">
      <LoginForm />
    </div>
  );
}
