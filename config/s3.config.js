import "dotenv/config";

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
export const BUCKET_URL =
  "https://research-2025.s3.ap-southeast-1.amazonaws.com/";
