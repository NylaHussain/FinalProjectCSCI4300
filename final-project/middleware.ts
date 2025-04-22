/*
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public paths where no authentication is needed
  const publicPaths = ["/", "/login", "/signup", "/api/items/signup"];

  // If the path is public, let it pass
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for JWT in Authorization header
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));  // No token, redirect to login
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Attach decoded info to the request object for use in routes if necessary
    request.headers.set("user", JSON.stringify(decoded));

    return NextResponse.next();  // Allow the request to continue
  } catch (error) {
    // Invalid or expired token, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/item-search",  // protected route
    "/recipe-search",  // protected route
    "/welcome",  // protected route
  ],
};


import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't need authentication
  const publicPaths = ["/", "/login", "/signup", "/api/items/signup"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next(); // Allow public paths
  }

  // Read JWT from the cookies
  const token = request.cookies.get("token")?.value;

  if (!token) {
    // No token, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify the token with jsonwebtoken
    jwt.verify(token, process.env.JWT_SECRET as string);

    // If token is valid, allow the request to continue
    return NextResponse.next();
  } catch (err) {
    // Token verification failed, redirect to login
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/welcome", "/item-search", "/recipe-search"], // Protected routes
  runtime: 'nodejs', // Ensure the Node.js runtime is used
};


import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes where no authentication is needed
  const publicPaths = ["/", "/login", "/signup", "/api/items/signup"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Read JWT from cookies
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));  // Redirect to login if no token
  }

  try {
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.next();  // Allow the request to proceed
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/login", request.url));  // Redirect to login if token is invalid
  }
}

export const config = {
  matcher: ["/welcome", "/item-search", "/recipe-search"],  // Protected routes
};



//new
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Use the Node.js runtime instead of the edge runtime
export const config = {
  runtime: 'nodejs',  // Specify Node.js runtime
  matcher: ["/welcome", "/item-search", "/recipe-search"],  // Protected routes
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes where no authentication is needed
  const publicPaths = ["/", "/login", "/signup", "/api/items/signup"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Read JWT from cookies
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));  // Redirect to login if no token
  }

  try {
    // Verify the token using jsonwebtoken (works now with Node.js runtime)
    jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.next();  // Allow the request to proceed
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/login", request.url));  // Redirect to login if token is invalid
  }
}





//works

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes where no authentication is needed
  const publicPaths = ["/", "/login", "/signup", "/api/items/signup"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Read JWT from cookies
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));  // Redirect to login if no token
  }

  try {
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.next();  // Allow the request to proceed
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/login", request.url));  // Redirect to login if token is invalid
  }
}

export const config = {
  matcher: ["/welcome", "/item-search", "/recipe-search"],  // Protected routes
  runtime: 'nodejs',
};

*/

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/item-search", "/recipe-search", "/welcome"], // Protect these routes
};
