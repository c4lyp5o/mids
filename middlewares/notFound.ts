import type { Request, Response, NextFunction } from "express";

const notFound = (_req: Request, res: Response, _next: NextFunction) => {
	res.status(404).json({ message: "Not Found" });
};

export default notFound;
