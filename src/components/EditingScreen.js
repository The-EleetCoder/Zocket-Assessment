import React, { useContext } from "react";
import { AppContext } from "../context/Context";

const EditingScreen = () => {
  const {
    caption,
    setCaption,
    backgroundColor,
    setBackgroundColor,
    cta,
    setCta,
    setUserImage,
  } = useContext(AppContext);

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

  return (
    <div className="editing-screen">
      {/* heating text */}
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
    </div>
  );
};

export default EditingScreen;
