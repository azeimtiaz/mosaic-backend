import express from "express";
import { getTemperature } from "./service.js";

const app = express();
const PORT = 3000;

app.get("/", (_, res) => res.sendStatus(200));

app.get("/forecast", async (req, res) => {
  try {
    // const { latitude, longitude } = req.query;

    const latitude = 6.0329;
    const longitude = 80.2168;
    const date = "2024-04-15T00:30:00+05:30";

    if (!latitude || !longitude || !date) throw Error("Data not provided");

    const temperature = await getTemperature({ latitude, longitude, date });
    res.send(temperature);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => console.log("Running: http://localhost:" + PORT));
