import express from "express";
import {
  getSkintone,
  getTemperature,
  getSimilarImages,
  getWebSearch,
} from "./service.js";
import { upload } from "./s3-upload.js";
import { AWS_BUCKET_NAME, BUCKET_URL } from "./config/s3.config.js";

const app = express();

app.use(express.json());

const PORT = 8081;

app.get("/", (_, res) => res.send(AWS_BUCKET_NAME));

app.get("/forecast", async (req, res) => {
  try {
    const { latitude, longitude, date } = req.query;

    if (!latitude || !longitude || !date) throw Error("Data not provided");

    const temperature = await getTemperature({ latitude, longitude, date });
    res.send(temperature);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileKey = req.file.key;
    res.status(200).send({ key: BUCKET_URL + fileKey });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/upload-detect", upload.single("file"), async (req, res) => {
  try {
    const fileKey = req.file.key;
    const fileURL = BUCKET_URL + fileKey;
    const { image, skinTone } = await getSkintone(fileURL);
    res.status(200).send({ image, skinTone });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send({ error: "Internal Server Error", message: error.message });
  }
});

app.post("/similar", async (req, res) => {
  try {
    const { searchImageUrl, wardrobeImages, threshold } = req.body;

    if (!searchImageUrl || !wardrobeImages || !threshold)
      throw Error("Data not provided");

    const similarImages = await getSimilarImages({
      searchImageUrl,
      wardrobeImages,
      threshold,
    });
    res.send(similarImages);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/web-search", async (req, res) => {
  try {
    const { searchImageUrl } = req.body;

    if (!searchImageUrl) throw Error("Data not provided");

    const productList = await getWebSearch({
      searchImageUrl,
    });
    res.send(productList);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => console.log("Running: http://localhost:" + PORT));
