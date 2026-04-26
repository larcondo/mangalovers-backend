import express from "express";
import cors from "cors";
import logger from "./services/logger";
import path from "path";
import fs from "fs/promises";
import { uploadsPath } from "./services/uploads";
import config from "./config/config";
import uploadMiddleware from "./middlewares/upload";

const app = express();

app.use(cors());
app.use(express.json());
// virtual path for image covers
app.use("/covers", express.static(config.UPLOADS_FOLDER_NAME));

app.get("/", (req, res) => {
  res.send(
    "<h1>Mangalovers con express y apollo-server.</h1><h2>Version: 1.0.0</h2>",
  );
});

app.get("/version", (_, res) => {
  res.json({
    name: "Mangalovers",
    version: "1.0.0",
  });
});

app.post("/series", uploadMiddleware, async (req, res) => {
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
    res.status(500).json({ message: "Error on upload cover." });
  }
});

app.post("/volumes", uploadMiddleware, async (req, res) => {
  try {
    const file = req.file as Express.Multer.File;

    const fileName = `${new Date().getTime()}-${file.originalname}`;

    const filePath = path.join(uploadsPath, "volumes", fileName);

    // Save file to disk
    await fs.writeFile(filePath, file.buffer);

    logger.log(`[${new Date().toISOString()}]`, "File saved:", filePath);

    res.status(201).send({
      message: "File upload successfully",
      filename: fileName,
      size: file.size,
      url: `/covers/volumes/${fileName}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error on upload cover." });
  }
});

export default app;
