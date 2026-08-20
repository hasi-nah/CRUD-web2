import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export class AuthController {
  static login(req: Request, res: Response) {
    const { username, password } = req.body;

    if (username === 'admin' && password === '') {
      const token = jwt.sign(
        { username },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1h' }
      );
      return res.status(200).json({ token });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  }
}