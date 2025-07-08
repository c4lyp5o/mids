import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import {
	loginMosque,
	validateMosqueToken,
} from "../controllers/authControllers";

const router = Router();

router.post(
	"/login",
	loginMosque as (
		req: Request,
		res: Response,
		next: NextFunction,
	) => Promise<void>,
);
router.get(
	"/validate",
	validateMosqueToken as (
		req: Request,
		res: Response,
		next: NextFunction,
	) => void,
);

export default router;
