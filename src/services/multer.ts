import multer from "multer";

const storage = multer.memoryStorage();

const multerStorage = multer({
  storage: storage,
  limits: {
    // Max field name size
    // Default: 100 bytes
    fieldNameSize: 100,
    // Max field value size (in bytes)
    // Default: 1MB
    fieldSize: 1024 * 1024 * 1,
    // Max number of non-file fields
    // Default: Infinity
    fields: 1,
    // For multipart forms, the max file size (in bytes)
    // Default: Infinity
    fileSize: 1024 * 500, // 500 KB
    // For multipart forms, the max number of file fields
    // Default: Infinty
    files: 1,
    // For multipart forms, the max number of parts (fields + files)
    // Default: Infinty
    parts: 2,
    // For multipart forms, the max number of header key=>value pairs to parse
    // Default: 2000
    headerPairs: 20,
  },
});

export const upload = multerStorage.single("cover");
