import axios from "axios";
import { data } from "./mock.js";
import { toCelsius } from "celsius";
import "dotenv/config";

const isMockDataEnabled = true;

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getTemperature = async ({ latitude, longitude, date }) => {
  try {
    const options = {
      method: "GET",
      url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
      params: {
        aggregateHours: "24",
        location: `${latitude}, ${longitude}`,
        contentType: "json",
        unitGroup: "us",
        shortColumnNames: "0",
      },
      headers: {
        "X-RapidAPI-Key": "2e4799088amshd60eff650fa2ae7p1e74a1jsn77ad8c2e35cb",
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
      },
    };
    let response;

    if (isMockDataEnabled) {
      response = await Promise.resolve(data);
    } else {
      response = await axios.request(options);
    }

    const key = `${latitude}, ${longitude}`;

    const result = response.data.locations[key].values.find(
      (value) => value.datetimeStr.slice(0, 10) === date.slice(0, 10)
    );

    return { temperature: toCelsius(result.temp) };
  } catch (error) {
    throw Error(error);
  }
};
export const getSkintone = async (fileURL) => {
  try {
    const options = {
      method: "POST",
      url: `${process.env.ML_MODEL}/getSkinTone`,
      data: {
        image_url: fileURL,
      },
      headers: {
        Accept: "/",
      },
    };
    const {
      data: { image, skin_tone, error },
    } = await axios.request(options);
    if (error) throw Error(error);
    return { image, skinTone: skin_tone };
  } catch (error) {
    throw Error(error);
  }
};

export const getSimilarImages = async ({
  searchImageUrl,
  wardrobeImages,
  threshold,
}) => {
  try {
    const options = {
      method: "POST",
      url: `${process.env.ML_MODEL}/similar`,
      data: {
        search_image_url: searchImageUrl,
        wardrobe_images: wardrobeImages,
        threshold,
      },
      headers: {
        Accept: "/",
      },
    };
    const {
      data: { similar_images, error },
    } = await axios.request(options);
    if (error) throw Error(error);
    return { similar_images };
  } catch (error) {
    throw Error(error);
  }
};

export const getWebSearch = async ({ searchImageUrl }) => {
  try {
    const options = {
      method: "POST",
      url: `${process.env.ML_MODEL}/web-search`,
      data: {
        search_image_url: searchImageUrl,
      },
      headers: {
        Accept: "/",
      },
    };
    const {
      data: { product_list, error },
    } = await axios.request(options);
    if (error) throw Error(error);
    return { product_list };
  } catch (error) {
    throw Error(error);
  }
};
