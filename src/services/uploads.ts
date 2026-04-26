import path from "path";
import config from "@config/config";
import logger from "./logger";
import { createFolderProm } from "@/utils/createFolder";

export const uploadsPath = path.resolve("./", config.UPLOADS_FOLDER_NAME);

export const initUploads = async () => {
  try {
    // Create series covers folder
    await createFolderProm(path.join(uploadsPath, "series"));
    // Create volumes covers folder
    await createFolderProm(path.join(uploadsPath, "volumes"));

    logger.log("Uploads folders initialize!");
    return;
  } catch (err) {
    logger.log("Error on Uploads initialization", err);
    process.exit(1);
  }
};
