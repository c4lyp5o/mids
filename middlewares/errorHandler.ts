import type { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

interface ErrorWithStatus extends Error {
	status?: number;
}

const errorHandler = (
	err: ErrorWithStatus,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	logger.error(err);
	const status = err.status || 500;
	res.status(status).json({
		error: {
			message: err.message || "Internal Server Error",
			status,
		},
	});
};

export default errorHandler;
