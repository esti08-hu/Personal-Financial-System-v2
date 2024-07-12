import type { Request } from 'express';
import type { User as PrismaUser } from '@prisma/client';

export interface IGetUserAuthInfoRequest extends Request {
  user?: PrismaUser;
}
