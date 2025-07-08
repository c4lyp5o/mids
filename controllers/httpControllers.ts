import type { Request, Response, RequestHandler } from "express";
import MosqueAccount from "../models/MosqueAccount";
import logger from "../utils/logger";
import fs from "node:fs/promises";
import path from "node:path";

export const healthCheck: RequestHandler = async (
	_req: Request,
	res: Response,
) => {
	res.status(200).json({ status: "ok" });
};

export const addMosqueAccount = async (req: Request, res: Response) => {
	const { mosqueName, zone, email, password } = req.body;

	console.log("Received request to add mosque account:", req.body);

	if (!mosqueName || !zone || !email || !password) {
		return res.status(400).json({
			error: "Missing required fields",
			required: ["mosqueName", "zone", "email", "password"],
		});
	}

	// Reject if mosqueName already exists
	const existingMosque = await MosqueAccount.findOne({ mosqueName });
	if (existingMosque) {
		return res.status(400).json({
			error: "Mosque name already exists",
		});
	}

	// Validate email format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return res.status(400).json({
			error: "Invalid email format",
		});
	}

	const mosque = await MosqueAccount.create({
		mosqueName,
		zone,
		email,
		password,
	});

	res.status(201).json({
		message: "Mosque account created successfully",
		id: mosque._id,
	});
};

export const getMosqueAccount = async (_req: Request, res: Response) => {
	logger.info("Received request to get mosque account details");
	const mosqueId = _req.params.id;
	if (!mosqueId) {
		return res.status(400).json({
			error: "Mosque ID is required",
		});
	}

	const mosque = await MosqueAccount.findById(mosqueId);
	if (!mosque) {
		return res.status(404).json({
			error: "Mosque account not found",
		});
	}
	logger.info(`Found mosque account: ${mosque.mosqueName}`);

	// Convert mongoose document to plain object and add full URLs to images
	const mosqueData = mosque.toObject();
	if (mosqueData.images) {
		mosqueData.images = mosqueData.images.map((img) => ({
			...img,
			url: `${_req.protocol}://${_req.get("host")}${img.path}`,
		}));
	}

	res.status(200).json(mosqueData);
};

export const updateMosqueAccount = async (req: Request, res: Response) => {
	const { mosqueName, details, zone, email, password, notifications } =
		req.body;
	const mosqueId = req.params.id;

	if (!mosqueId) {
		return res.status(400).json({
			error: "Mosque ID is required",
		});
	}

	const mosque = await MosqueAccount.findById(mosqueId);
	if (!mosque) {
		return res.status(404).json({
			error: "Mosque account not found",
		});
	}

	if (mosqueName) mosque.mosqueName = mosqueName;
	if (details) mosque.details = details;
	if (zone) mosque.zone = zone;
	if (email) mosque.email = email;
	if (password) mosque.password = password;
	if (notifications) mosque.notifications = notifications;

	await mosque.save();

	res.status(200).json({
		message: "Mosque account updated successfully",
		id: mosque._id,
	});
};

export const deleteMosqueAccount = async (req: Request, res: Response) => {
	const mosqueId = req.params.id;

	if (!mosqueId) {
		return res.status(400).json({
			error: "Mosque ID is required",
		});
	}

	const mosque = await MosqueAccount.findByIdAndDelete(mosqueId);
	if (!mosque) {
		return res.status(404).json({
			error: "Mosque account not found",
		});
	}

	res.status(200).json({
		message: "Mosque account deleted successfully",
		id: mosque._id,
	});
};

export const uploadImages = async (req: Request, res: Response) => {
	try {
		const mosqueId = req.params.id;
		const files = req.files as Express.Multer.File[];

		if (!files || files.length === 0) {
			return res.status(400).json({ error: "No files uploaded" });
		}

		const mosque = await MosqueAccount.findById(mosqueId);
		if (!mosque) {
			return res.status(404).json({ error: "Mosque not found" });
		}

		// Process uploaded files
		const imageMetadata = files.map((file) => ({
			filename: file.filename,
			path: `/uploads/${mosqueId}/${file.filename}`,
			uploadedAt: new Date(),
		}));

		// Add to existing images or create new array
		mosque.images = [...(mosque.images || []), ...imageMetadata];
		await mosque.save();

		res.status(200).json({
			message: "Images uploaded successfully",
			images: imageMetadata,
		});
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to upload images" });
	}
};

export const getMosqueImages = async (req: Request, res: Response) => {
	try {
		const mosqueId = req.params.id;
		const mosque = await MosqueAccount.findById(mosqueId).select("images");

		if (!mosque) {
			return res.status(404).json({ error: "Mosque not found" });
		}

		// Return full URLs for frontend
		const imagesWithUrls =
			mosque.images?.map((img) => ({
				...img,
				url: `${req.protocol}://${req.get("host")}${img.path}`,
			})) || [];

		res.status(200).json({ images: imagesWithUrls });
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to fetch images" });
	}
};

export const deleteImage = async (req: Request, res: Response) => {
	try {
		const { id: mosqueId, filename } = req.params;

		if (!mosqueId || !filename) {
			return res
				.status(400)
				.json({ error: "Mosque ID and filename are required" });
		}

		const mosque = await MosqueAccount.findById(mosqueId);
		if (!mosque) {
			return res.status(404).json({ error: "Mosque not found" });
		}

		// Find and remove the image from database
		const imageIndex = mosque.images?.findIndex(
			(img) => img.filename === filename,
		);
		if (imageIndex === -1 || imageIndex === undefined) {
			return res.status(404).json({ error: "Image not found" });
		}

		// Delete physical file
		const filePath = path.join(process.cwd(), "uploads", mosqueId, filename);
		try {
			await fs.unlink(filePath);
		} catch (error) {
			logger.warn(error);
		}

		// Remove from database
		mosque.images?.splice(imageIndex, 1);
		await mosque.save();

		res.status(200).json({ message: "Image deleted successfully" });
	} catch (error) {
		logger.error(error);
		res.status(500).json({ error: "Failed to delete image" });
	}
};
