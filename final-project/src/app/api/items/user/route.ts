import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectMongoDB from '../../../../../config/mongodb';
import User from '../../../models/userSchema'; 

export async function GET() {
  try {
    await connectMongoDB();

    const token = cookies().get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded: any = jwt.decode(token);

    if (!decoded?.username) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }

    const user = await User.findOne({ username: decoded.username });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ username: user.username }, { status: 200 });
  } catch (error) {
    console.error('Error in /api/items/user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
