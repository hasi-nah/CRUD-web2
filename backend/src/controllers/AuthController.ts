import { Request, Response } from 'express'; 
import jwt from 'jsonwebtoken'; 

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
      const token = jwt.sign(
        { username },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token });
      return;
    }

    res.status(401).json({ message: 'Invalid credentials' });
  }
}