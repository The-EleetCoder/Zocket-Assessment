import React, { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../context/Context";
import { SketchPicker } from "react-color";

const EditingScreen = () => {
  const {
    caption,
    setCaption,
    backgroundColor,
    setBackgroundColor,
    cta,
    setCta,
    setUserImage,
    pickedColors,
    addPickedColor,
  } = useContext(AppContext);

  const [isColorPickerVisible, setColorPickerVisible] = useState(false);
  const [temporaryColor, setTemporaryColor] = useState(backgroundColor);
  const colorPickerRef = useRef(null);

  // function for handling image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          setUserImage(img);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // If the color picker is currently in the DOM && If the click event occurred outside the color picker
  const handleClickOutside = (event) => {
    if (
      colorPickerRef.current &&
      !colorPickerRef.current.contains(event.target)
    ) {
      setColorPickerVisible(false);
      addPickedColor(temporaryColor);
    }
  };

  // manages adding and removing the event listener based on the visibility of the color picker
  useEffect(() => {
    if (isColorPickerVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isColorPickerVisible]);

  const handleColorChange = (color) => {
    setTemporaryColor(color.hex);
    setBackgroundColor(color.hex);
  };

  return (
    <div className="editing-screen">
      {/* heading text */}
      <div className="heading-text-div">
        <div>Ad Customization</div>
        <div>Customize your ads and get the templates accordingly</div>
      </div>

      {/* image upload */}
      <div className="upload-image-div">
        <label className="upload-image-text">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="upload-image-input"
        />
      </div>

      {/* line */}
      <div className="line-div">
        <div>Edit contents</div>
      </div>

      {/* content */}
      <div className="content-div">
        <label className="content-text">Ad Content</label>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="content-input"
        />
      </div>

      {/* cta */}
      <div className="cta-div">
        <label className="cta-text">CTA</label>
        <input
          type="text"
          value={cta}
          onChange={(e) => setCta(e.target.value)}
          className="cta-input"
        />
      </div>

      {/* color picker */}
      <div className="color-picker-div">
        <label className="color-picker-text">Background Color</label>
        <div className="color-picker-buttons">
          {/* previous pickedColors */}
          {pickedColors.map((color, index) => (
            <button
              key={index}
              style={{ backgroundColor: color }}
              className="color-button"
              onClick={() => setBackgroundColor(color)}
            />
          ))}
          {/* the '+' button */}
          <button
            className="color-picker-add-button"
            onClick={() => setColorPickerVisible(!isColorPickerVisible)}
          >
            +
          </button>
        </div>
        {isColorPickerVisible && (
          <div className="color-picker-popover" ref={colorPickerRef}>
            <SketchPicker color={temporaryColor} onChange={handleColorChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditingScreen;
