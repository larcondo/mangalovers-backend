import { Request, Response, NextFunction } from "express";
import { upload } from "@/services/multer";
import logger from "@/services/logger";
import multer from "multer";
import { fileTypeFromBuffer } from "file-type";

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, async (err) => {
    // If is Multer Error
    if (err instanceof multer.MulterError) {
      const message =
        err.code === "LIMIT_FILE_SIZE"
          ? "File too big. Maximum size: 500 KB"
          : err.message;
      logger.log("Multer error:", message);
      return res.status(400).send({ message });
    }

    // If is Unknown Error
    if (err) {
      logger.log("Error:", err);
      return res.status(500).send("Error: " + err);
    }

    const file = req.file;

    if (!file) {
      return res.status(400).send("File is missing");
    }

    // Validate file using Magic Numbers
    const fileType = await fileTypeFromBuffer(file.buffer);
    const allowedTypes = ["image/jpeg", "image/webp"];

    if (!fileType || !allowedTypes.includes(fileType.mime)) {
      return res
        .status(400)
        .json({ message: "Wrong file format. The file must be JPEG or WEBP" });
    }

    next();
  });
};

export default uploadMiddleware;
