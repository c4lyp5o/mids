import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "node:path";

import logger from "./utils/logger.ts";

import authRouter from "./routes/authRoutes.ts";
import httpRouter from "./routes/httpRoutes.ts";

import notFound from "./middlewares/notFound.ts";
import errorHandler from "./middlewares/errorHandler.ts";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/mosque", httpRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI as string);
		logger.info("Connected to MongoDB");
	} catch (error) {
		logger.error(error);
		process.exit(1);
	}
	logger.info(`Server is running on port ${PORT}`);
});
