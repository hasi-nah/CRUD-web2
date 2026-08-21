import { Request, Response, NextFunction } from 'express'; 
import jwt from 'jsonwebtoken'; 

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(401).json({ message: 'Invalid or missing API key' });
    return;
  }
  next(); 
};

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    res.status(401).json({ message: 'Missing JWT token' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    (req as any).user = decoded; 
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired JWT token' });
  }
};