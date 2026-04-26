import fs from "fs/promises";
import path from "path";
import logger from "@services/logger";

// Check if a folder exists.
export const folderExists = async (folderPath: string) => {
  try {
    await fs.access(folderPath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
};

// Create a folder if it doesn't exist.
export const createFolderProm = async (folderPath: string) => {
  try {
    const isFolderCreated = await folderExists(folderPath);

    if (isFolderCreated) return;

    await fs.mkdir(folderPath, { recursive: true });

    const folderRelativePath = path.relative(path.resolve("."), folderPath);
    logger.log("[Folder created]:", folderRelativePath);
  } catch (error) {
    throw new Error("Error on create folder");
  }
};
