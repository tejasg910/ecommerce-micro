import { Request, Response, NextFunction } from 'express';

export function validateLogin(
  req: Request, 
  res: Response, 
  next: NextFunction
): void {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(400).json({ success: false, message: 'Email and password are required' });
    return;
  }
  
  next();
}