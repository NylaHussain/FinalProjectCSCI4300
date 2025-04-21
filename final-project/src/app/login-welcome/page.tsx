"use client";

import { useSession } from "next-auth/react";

export default function WelcomePage() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Welcome, {session?.user?.name || "Guest"}!</h1>
    </div>
  );
}