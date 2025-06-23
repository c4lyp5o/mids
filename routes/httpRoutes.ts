import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import {
  healthCheck,
  addMosqueAccount,
  getMosqueAccount,
  updateMosqueAccount,
  deleteMosqueAccount,
  uploadImages,
  getMosqueImages,
  deleteImage,
} from '../controllers/httpControllers';
import uploadSystem from '../middlewares/multer';
import { jwtAuth } from '../middlewares/jwtAuth';

const router = Router();

router.get(
  '/healthcheck',
  healthCheck as (req: Request, res: Response, next: NextFunction) => any
);
router
  .route('/')
  .post(
    addMosqueAccount as (req: Request, res: Response, next: NextFunction) => any
  );

router
  .route('/:id')
  .get(
    jwtAuth as (req: Request, res: Response, next: NextFunction) => any,
    getMosqueAccount as (req: Request, res: Response, next: NextFunction) => any
  )
  .put(
    jwtAuth as (req: Request, res: Response, next: NextFunction) => any,
    updateMosqueAccount as (
      req: Request,
      res: Response,
      next: NextFunction
    ) => any
  )
  .delete(
    jwtAuth as (req: Request, res: Response, next: NextFunction) => any,
    deleteMosqueAccount as (
      req: Request,
      res: Response,
      next: NextFunction
    ) => any
  );

// Image-specific routes
router
  .route('/:id/images')
  .get(
    jwtAuth as (req: Request, res: Response, next: NextFunction) => any,
    getMosqueImages as (req: Request, res: Response, next: NextFunction) => any
  )
  .post(
    jwtAuth as (req: Request, res: Response, next: NextFunction) => any,
    uploadSystem,
    uploadImages as (req: Request, res: Response, next: NextFunction) => any
  );

router
  .route('/:id/images/:filename')
  .delete(
    jwtAuth as (req: Request, res: Response, next: NextFunction) => any,
    deleteImage as (req: Request, res: Response, next: NextFunction) => any
  );

export default router;
