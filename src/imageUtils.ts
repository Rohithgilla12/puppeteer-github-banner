import { createCanvas, loadImage } from "canvas";
import fs from "fs";
import sharp from "sharp";

export const addTextToImage = async (filename: string) => {
  // resize is required only for first time
  //   await sharp("base.png").resize(1000, 420).toFile("resize_base.png");
  const beforeResize = await loadImage(filename);
  const toResizeWidth = beforeResize.width - 48;
  const toResizeHeight = beforeResize.height - 16;
  const roundedCorners = Buffer.from(
    `<svg><rect x="0" y="0" width="${toResizeWidth}" height="${toResizeHeight}" rx="16" ry="16"/></svg>`
  );
  await sharp(filename)
    .resize(toResizeWidth, toResizeHeight)
    .composite([
      {
        input: roundedCorners,
        blend: "dest-in",
      },
    ])
    .toFile("rounded_corner.png");

  const img = await loadImage("rounded_corner.png");
  const base = await loadImage("resize_base.png");

  const canvas = createCanvas(1000, 420);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(base, 0, 0);
  ctx.drawImage(img, 0, 230);
  ctx.font = "24px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("(The GitHub contribution chart updated in realtime *)", 0, 60);
  // save canvas image as png
  const out = fs.createWriteStream("./final.png");
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("The PNG file was created."));
};

// addTextToImage("contributions.png");
