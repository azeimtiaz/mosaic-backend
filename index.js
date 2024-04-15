import express from "express";
import { getTemperature } from "./service.js";
import { upload } from "./s3-upload.js";
import { BUCKET_URL } from "./config/s3.config.js";

const app = express();
const PORT = 3000;

app.get("/", (_, res) => res.sendStatus(200));

app.get("/forecast", async (req, res) => {
  try {
    const { latitude, longitude, date } = req.query;

    // const latitude = 6.0329;
    // const longitude = 80.2168;
    // const date = "2024-04-15T00:30:00+05:30";

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

app.listen(PORT, () => console.log("Running: http://localhost:" + PORT));
