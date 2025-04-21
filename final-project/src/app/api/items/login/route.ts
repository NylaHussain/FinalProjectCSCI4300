import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import User from '@/models/User';
import { createSessionToken } from '@/utils/auth';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await connectToDB();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = createSessionToken(user);
  const res = NextResponse.json({ message: 'Login successful' });

  res.cookies.set('token', token, { httpOnly: true });

  return res;
}
