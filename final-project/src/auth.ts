import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export function createSessionToken(user: any) {
  return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
    expiresIn: '7d',
  });
}

export function verifySessionToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
}