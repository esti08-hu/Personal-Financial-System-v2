import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';
import type { IGetUserAuthInfoRequest } from '../types/express';

export default async function validateJwtToken(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(403).json({ error: 'No token provided' });
  }

  const token = authorizationHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Malformed token' });
  }

  const secretKey = process.env.JWT_SECRET_KEY as string;

  try {
    const decoded = jwt.verify(token, secretKey) as { userId: number };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user; // Attach user to the request object
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
}
