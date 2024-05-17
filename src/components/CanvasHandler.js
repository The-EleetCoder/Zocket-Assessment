export default class CanvasHandler {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.defaultBackgroundColor = "#0369A1";
    this.setBackgroundColor(this.defaultBackgroundColor);
  }

  setBackgroundColor(color) {
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawImage(url, x, y, width, height, callback) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      this.context.drawImage(img, x, y, width, height);
      if (callback) callback();
    };
  }

  drawUserImage(image, x, y, width, height) {
    this.context.drawImage(image, x, y, width, height);
  }

  drawText(text, x, y, fontSize, color, maxWidth) {
    this.context.fillStyle = color;
    this.context.font = `${fontSize}px Arial`;
    this.wrapText(text, x, y, maxWidth, fontSize);
  }

  wrapText(text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    let lines = [];
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = this.context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && i > 0) {
        lines.push(line.trim());
        line = words[i] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());

    for (let i = 0; i < lines.length; i++) {
      this.context.fillText(lines[i], x, y);
      y += lineHeight;
    }
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawAllElements(templateData, userImage = null) {
    this.clearCanvas();
    this.setBackgroundColor(
      templateData.backgroundColor || this.defaultBackgroundColor
    );

    // Drawing the design pattern first
    this.drawImage(
      templateData.urls.design_pattern,
      0,
      0,
      this.canvas.width,
      this.canvas.height,
      () => {
        // Drawing the user image
        if (userImage) {
          this.drawUserImage(
            userImage,
            templateData.image_mask.x,
            templateData.image_mask.y,
            templateData.image_mask.width,
            templateData.image_mask.height
          );
          // Drawing the mask stroke after the user image
          this.drawImage(
            templateData.urls.stroke,
            0,
            0,
            this.canvas.width,
            this.canvas.height,
            () => {
              // Drawing the text elements
              this.drawText(
                templateData.caption.text,
                templateData.caption.position.x,
                templateData.caption.position.y,
                templateData.caption.font_size,
                templateData.caption.text_color,
                templateData.caption.max_characters_per_line *
                  templateData.caption.font_size *
                  0.5
              );
              this.drawText(
                templateData.cta.text,
                templateData.cta.position.x,
                templateData.cta.position.y,
                30,
                templateData.cta.text_color,
                200
              );
            }
          );
        } else {
          // Drawing the mask and then the mask stroke
          this.drawImage(
            templateData.urls.mask,
            0,
            0,
            this.canvas.width,
            this.canvas.height,
            () => {
              this.drawImage(
                templateData.urls.stroke,
                0,
                0,
                this.canvas.width,
                this.canvas.height,
                () => {
                  // Drawing the text elements
                  this.drawText(
                    templateData.caption.text,
                    templateData.caption.position.x,
                    templateData.caption.position.y,
                    templateData.caption.font_size,
                    templateData.caption.text_color,
                    templateData.caption.max_characters_per_line *
                      templateData.caption.font_size *
                      0.5
                  );
                  this.drawText(
                    templateData.cta.text,
                    templateData.cta.position.x,
                    templateData.cta.position.y,
                    30,
                    templateData.cta.text_color,
                    200
                  );
                }
              );
            }
          );
        }
      }
    );
  }
}
