import multer from "multer";
import multerS3 from "multer-s3-transform";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_NAME,
} from "./config/s3.config.js";

const S3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

export const upload = multer({
  storage: multerS3({
    s3: S3,
    bucket: AWS_BUCKET_NAME,
    acl: "public-read",
    key: (req, file, cb) => {
      const fileName = uuidv4() + "-" + file.originalname;
      cb(null, fileName);
    },
  }),
});

// export default upload.fields([{ name: "face", maxCount: 1 }]);

// export const uploadFile = async (req, res) => {
//   upload(req, res, async function (err) {
//     if (err) {
//       return res.status(400).send({ result: 0, message: err });
//     }
//     return res.status(200).send({ result: 1, message: "Successs" });
//   });
// };
