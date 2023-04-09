import React from "react";
import { useState } from "react";
import Modal from "./Modal";

const App = () => {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const surpriseOptions = [
    "fruits walkout in the summer",
    "sunrise in the northern winters",
    "moonfall from saturn",
  ];

  // get images from the openai by typing the text in the text box
  const getImages = async () => {
    setImages([]);
    setError("");
    setLoading(true);
    if (value === "") {
      setError("Error! Please enter the value");
      setLoading(false);
      return;
    }
    //sending the typed text to the server and getting the images back
    try {
      const response = await fetch("http://localhost:8000/images", {
        method: "POST",
        body: JSON.stringify({
          message: value,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setImages(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const surpriseMe = () => {
    setImages([]);
    setError("");
    const randomValue =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

  //uploading images
  const uploadImage = async (e) => {
    const formData = new FormData();
    //we upload only one image so index is 0
    formData.append("file", e.target.files[0]);
    setModalOpen(true);
    setSelectedImage(e.target.files[0]);
    e.target.value = null;
    //sending the image to server
    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  //generating variations of image
  const generateVariations = async () => {
    setImages([]);
    setModalOpen(false);
    setLoading(true);
    if (selectedImage == null) {
      setError("Error! Must have an existing image");
      setModalOpen(false);
      return;
    }
    //sending request to server to get variation of images
    try {
      const response = await fetch("http://localhost:8000/variations", {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
      setImages(data);
      setError("");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <section className="header">
        <h1>DALL-E Clone</h1>
      </section>
      <section className="search-section">
        <p>
          Start with a detailed description
          <span className="surprise" onClick={surpriseMe}>
            Surprise me
          </span>
        </p>
        <div className="input-container">
          <input
            type="text"
            placeholder="An impressionist oil painting of a sunflower..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <button onClick={getImages}>Generate</button>
        </div>
        <p className="extra-info">
          Or
          <span>
            <label htmlFor="file"> upload an 256x256 image </label>
            <input
              type="file"
              id="file"
              accept="image/png"
              hidden
              onChange={uploadImage}
            />
          </span>
          in PNG format
        </p>
        {error && <p>{error}</p>}
        {/* modal content */}
        {modalOpen && (
          <div className="overlay">
            <Modal
              setModalOpen={setModalOpen}
              setSelectedImage={setSelectedImage}
              selectedImage={selectedImage}
              generateVariations={generateVariations}
            />
          </div>
        )}
      </section>

      {/* displaying the images */}
      <section className="image-section">
        {loading && <div className="loading"></div>}
        {images?.map((image, index) => {
          return (
            <img
              src={image.url}
              alt={`Generated image of ${value}`}
              key={index}
            />
          );
        })}
      </section>
      <section className="footer">
        <p>
          Copyright &copy; <span>{new Date().getFullYear()}</span>. Designed and
          developed by Arul Prakassam
        </p>
      </section>
    </div>
  );
};

export default App;
