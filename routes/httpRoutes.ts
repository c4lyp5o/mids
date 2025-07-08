import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import {
	healthCheck,
	addMosqueAccount,
	getMosqueAccount,
	updateMosqueAccount,
	deleteMosqueAccount,
	uploadImages,
	getMosqueImages,
	deleteImage,
} from "../controllers/httpControllers";
import uploadSystem from "../middlewares/multer";
import { jwtAuth } from "../middlewares/jwtAuth";

const router = Router();

router.get(
	"/healthcheck",
	healthCheck as (
		req: Request,
		res: Response,
		next: NextFunction,
	) => Promise<void>,
);
router
	.route("/")
	.post(
		addMosqueAccount as (
			req: Request,
			res: Response,
			next: NextFunction,
		) => Promise<void>,
	);

router
	.route("/:id")
	.get(
		jwtAuth as (req: Request, res: Response, next: NextFunction) => void,
		getMosqueAccount as (
			req: Request,
			res: Response,
			next: NextFunction,
		) => Promise<void>,
	)
	.put(
		jwtAuth as (req: Request, res: Response, next: NextFunction) => void,
		updateMosqueAccount as (
			req: Request,
			res: Response,
			next: NextFunction,
		) => Promise<void>,
	)
	.delete(
		jwtAuth as (req: Request, res: Response, next: NextFunction) => void,
		deleteMosqueAccount as (
			req: Request,
			res: Response,
			next: NextFunction,
		) => Promise<void>,
	);

// Image-specific routes
router
	.route("/:id/images")
	.get(
		jwtAuth as (req: Request, res: Response, next: NextFunction) => void,
		getMosqueImages as (
			req: Request,
			res: Response,
			next: NextFunction,
		) => Promise<void>,
	)
	.post(
		jwtAuth as (req: Request, res: Response, next: NextFunction) => void,
		uploadSystem,
		uploadImages as (
			req: Request,
			res: Response,
			next: NextFunction,
		) => Promise<void>,
	);

router
	.route("/:id/images/:filename")
	.delete(
		jwtAuth as (req: Request, res: Response, next: NextFunction) => void,
		deleteImage as (
			req: Request,
			res: Response,
			next: NextFunction,
		) => Promise<void>,
	);

export default router;
