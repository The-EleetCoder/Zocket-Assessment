import React, { useState, useContext } from "react";
import { AppContext } from "../context/Context";

const CanvasEditor = () => {
  const { caption, cta, backgroundColor } = useContext(AppContext);

  const templateData = {
    caption: {
      text: caption,
      position: { x: 50, y: 50 },
      font_size: 44,
      text_color: "#FFFFFF",
      max_characters_per_line: 31,
      alignment: "left",
    },
    cta: {
      text: cta,
      position: { x: 190, y: 320 },
      text_color: "#FFFFFF",
      background_color: "#000000",
    },
    image_mask: { x: 56, y: 442, width: 970, height: 600 },
    urls: {
      mask: "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png",
      stroke:
        "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png",
      design_pattern:
        "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png",
    },
    backgroundColor: backgroundColor,
  };

  return <div>CanvasEditor</div>;
};

export default CanvasEditor;
