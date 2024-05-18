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

  splitTextIntoLines(text, maxWidth) {
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
    return lines;
  }

  wrapText(text, x, y, maxWidth, lineHeight) {
    const lines = this.splitTextIntoLines(text, maxWidth);
    for (let i = 0; i < lines.length; i++) {
      this.context.fillText(lines[i], x, y);
      y += lineHeight;
    }
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawRoundedRect(x, y, width, height, radius, color) {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.moveTo(x + radius, y);
    this.context.lineTo(x + width - radius, y);
    this.context.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.context.lineTo(x + width, y + height - radius);
    this.context.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height
    );
    this.context.lineTo(x + radius, y + height);
    this.context.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.context.lineTo(x, y + radius);
    this.context.quadraticCurveTo(x, y, x + radius, y);
    this.context.closePath();
    this.context.fill();
  }

  drawCenteredText(text, x, y, width, height, fontSize, color, maxWidth) {
    this.context.font = `${fontSize}px Arial`;
    this.context.fillStyle = color;
    const lines = this.splitTextIntoLines(text, maxWidth);
    let lineHeight = fontSize * 1.2;
    let totalHeight = lines.length * lineHeight;
    let startY = y + (height - totalHeight) / 2 + fontSize;

    for (let i = 0; i < lines.length; i++) {
      let lineWidth = this.context.measureText(lines[i]).width;
      let startX = x + (width - lineWidth) / 2;
      this.context.fillText(lines[i], startX, startY);
      startY += lineHeight;
    }
  }

  drawCTA(cta) {
    const {
      text,
      position: { x, y },
      font_size = 30,
      text_color,
      background_color,
      wrap_length = 20,
    } = cta;

    const padding = 24;
    const lineHeight = font_size * 1.2;
    const maxWidth = wrap_length * font_size * 0.5;
    const lines = this.splitTextIntoLines(text, maxWidth);
    const textWidth = maxWidth + padding * 2;
    const textHeight = lines.length * lineHeight + padding * 2;

    this.drawRoundedRect(x, y, textWidth, textHeight, 20, background_color);
    this.drawCenteredText(
      text,
      x + padding,
      y + padding,
      textWidth - padding * 2,
      textHeight - padding * 2,
      font_size,
      text_color,
      maxWidth
    );
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
              this.drawCTA(templateData.cta);
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
                  this.drawCTA(templateData.cta);
                }
              );
            }
          );
        }
      }
    );
  }
}
