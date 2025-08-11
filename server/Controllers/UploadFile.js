import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import storage from "../config/firebaseStorage.js";

const Uploadrouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

Uploadrouter.post("/", upload.single("file"), async (req, res) => {
  try {
    // Lấy file từ yêu cầu
    const file = req.file;

    // Tạo tên file mới
    if (file) {
      const fileName = `${uuidv4()}${path.extname(file.originalname)}`;

      const blob = storage.file(fileName);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });

      // Xử lý lỗi trong stream
      blobStream.on("error", (error) => {
        return res.status(400).json({ message: error.message });
      });

      // Xử lý khi hoàn tất stream
      blobStream.on("finish", () => {
        // Tạo URL công khai
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${encodeURIComponent(fileName)}?alt=media`;
        
        // Trả về tên file và URL công khai
        return res.status(200).json({ url: publicUrl });
      });

      // Kết thúc stream và gửi buffer của file
      blobStream.end(file.buffer);
    } else {
      // Khi không có file
      return res.status(400).json({ message: "Hãy upload file " });
    }
  } catch (error) {
    // Xử lý các lỗi khác
    return res.status(400).json({ message: error.message });
  }
});

export default Uploadrouter;
