const PORT = process.env.PORT || 8000;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

const fs = require("fs");

const multer = require("multer");

//saving the image in public folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //if "" means then it saves directly in the same folder
    cb(null, "public");
  },
  //setting filename for image
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

//for file path
let filePath;

//openai details
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//getting the images based on what value typed in text box
app.post("/images", async (req, res) => {
  try {
    //openai
    const response = await openai.createImage({
      prompt: req.body.message,
      n: 10,
      size: "1024x1024",
    });
    res.send(response.data.data);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
});

//uploading the image and saving the local
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    filePath = req.file.path;
  });
});

//creating variations of the image
app.post("/variations", async (req, res) => {
  try {
    //openai
    const response = await openai.createImageVariation(
      fs.createReadStream(filePath),
      10,
      "256x256"
    );
    console.log("response", response);
    res.send(response.data.data);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
});

app.listen(PORT, () => {
  console.log("Your server is running on PORT " + PORT);
});
