import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../context/Context";
import CanvasHandler from "./CanvasHandler";

const CanvasEditor = () => {
  const canvasRef = useRef(null);
  const [canvasHandler, setCanvasHandler] = useState(null);
  const { caption, cta, backgroundColor, userImage } = useContext(AppContext);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    const handler = new CanvasHandler(canvas);
    setCanvasHandler(handler);
    handler.drawAllElements(templateData);
  }, []);

  useEffect(() => {
    if (canvasHandler) {
      canvasHandler.drawAllElements(templateData, userImage);
    }
  }, [caption, cta, backgroundColor, userImage]);

  return (
    <div className="canvas">
      <canvas
        ref={canvasRef}
        width="1080"
        height="1080"
        style={{ height: 400, width: 400 }}
      />
    </div>
  );
};

export default CanvasEditor;
