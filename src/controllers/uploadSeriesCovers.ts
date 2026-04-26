import path from "path";
import fs from "fs/promises";
import logger from "@services/logger";
import { Request, Response } from "express";
import { uploadsPath } from "@services/uploads";

const uploadSeriesCovers = async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File;

    const fileName = `${new Date().getTime()}-${file.originalname}`;

    const filePath = path.join(uploadsPath, "series", fileName);

    // Save file to disk
    await fs.writeFile(filePath, file.buffer);

    logger.log(`[${new Date().toISOString()}]`, "File saved:", filePath);

    res.status(201).send({
      message: "File upload successfully",
      filename: fileName,
      size: file.size,
      url: `/covers/series/${fileName}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error on upload series cover." });
  }
};

export default uploadSeriesCovers;
