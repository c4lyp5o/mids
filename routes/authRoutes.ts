import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import {
  loginMosque,
  validateMosqueToken,
} from '../controllers/authControllers';

const router = Router();

router.post(
  '/login',
  loginMosque as (req: Request, res: Response, next: NextFunction) => any
);
router.get(
  '/validate',
  validateMosqueToken as (
    req: Request,
    res: Response,
    next: NextFunction
  ) => any
);

export default router;
