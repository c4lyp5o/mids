import multer from 'multer';
import type { Request } from 'express';
import fs from 'fs';
import path from 'path';

const safekeeping = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    const uploadDir = path.join(
      process.cwd(),
      'uploads',
      req.params.id || req.params.mosqueId || 'default'
    );

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename to avoid conflicts
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

const uploadSystem = multer({
  storage: safekeeping,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
}).array('images', 10); // Allow up to 10 images

export default uploadSystem;
