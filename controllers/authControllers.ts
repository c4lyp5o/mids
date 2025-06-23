import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import MosqueAccount from '../models/MosqueAccount';
import logger from '../utils/logger';

export const loginMosque = async (req: Request, res: Response) => {
  logger.info('Received request to login mosque account');
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required',
    });
  }

  const mosque = await MosqueAccount.findOne({
    email,
    password,
  }).select('-__v -createdAt -updatedAt');

  if (!mosque) {
    return res.status(401).json({
      error: 'Invalid email or password',
    });
  }
  // Generate JWT token with no expiry
  const token = jwt.sign(
    { id: mosque._id, email: mosque.email },
    process.env.JWT_SECRET || 'your-secret-key'
  );

  res.status(200).json({ mosque, token });
};

export const logoutMosque = async (req: Request, res: Response) => {
  logger.info('Received request to logout mosque account');
  // For stateless JWT authentication, logout is handled on the client side
  res.status(200).json({ message: 'Logged out successfully' });
};

export const validateMosqueToken = async (req: Request, res: Response) => {
  logger.info('Received request to validate mosque token');
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    );
    res.status(200).json({ valid: true, user: decoded });
  } catch (err) {
    logger.error(err);
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
};
