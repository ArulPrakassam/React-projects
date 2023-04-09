import { useState, useRef } from "react";
const Modal = ({
  setModalOpen,
  setSelectedImage,
  selectedImage,
  generateVariations,
}) => {
  const [error, setError] = useState(null);
  const imgRef = useRef(null);
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };
  //checking the image size as 256x256
  const checkSize = () => {
    if (imgRef.current.width === 256 && imgRef.current.height === 256) {
      generateVariations();
    } else {
      setError("Error! Choose 256 x 256 image");
    }
  };
  return (
    <div className="modal">
      <div onClick={closeModal} className="close-btn">
        ✖
      </div>
      {/* modal image container */}
      <div className="img-container">
        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            ref={imgRef}
            alt="uploaded image"
          />
        )}
      </div>
      <p>{error || "Image must be 256 x 256"}</p>
      {!error && <button onClick={checkSize}>Generate</button>}
      {error && <button onClick={closeModal}>Close this and try again</button>}
    </div>
  );
};
export default Modal;
