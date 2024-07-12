// // app/backend/src/middleware/validateUserId.ts
// import { Request, Response, NextFunction } from 'express';

// const validateUserId = (req: Request, res: Response, next: NextFunction) => {
//   const { userId } = req.body;

//   if (!userId) {
//     return res.status(400).json({ error: 'userId is required' });
//   }
  
//   next();
// };

// export default validateUserId;
