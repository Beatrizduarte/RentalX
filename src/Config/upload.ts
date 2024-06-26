import multer from "multer";
import crypto from "crypto";
import { resolve } from "path";

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
  tmpFolder,
  
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHas = crypto.randomBytes(16).toString("hex");
      const filename = `${fileHas}-${file.originalname}`;

      return callback(null, filename);
    }
  })
}
