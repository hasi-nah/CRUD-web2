import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware Cle API
export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Clé API invalide ou manquante' });
  }
  next();
};

// Middleware Token JWT
export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token JWT manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token JWT invalide ou expiré' });
  }
};