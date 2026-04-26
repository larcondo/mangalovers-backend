import express from "express";
import cors from "cors";
import config from "./config/config";
import uploadMiddleware from "./middlewares/upload";
import uploadSeriesCovers from "./controllers/uploadSeriesCovers";
import uploadVolumesCovers from "./controllers/uploadVolumesCovers";

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

app.post("/series", uploadMiddleware, uploadSeriesCovers);

app.post("/volumes", uploadMiddleware, uploadVolumesCovers);

export default app;
