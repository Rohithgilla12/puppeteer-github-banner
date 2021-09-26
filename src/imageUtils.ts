import { createCanvas, loadImage } from "canvas";
import fs from "fs";

const addTextToImage = async (filename: string) => {
  const img = await loadImage(filename);
  const base = await loadImage("base.png");
  console.log(base.width + 120, base.height + 120);

  const canvas = createCanvas(base.width, base.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(base, 0, 0);
  ctx.drawImage(img, 0, 0);
  ctx.font = "46px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(
    "(This GitHub contribution chart updated in realtime)",
    1024,
    60
  );
  // save canvas image as png
  const out = fs.createWriteStream(__dirname + "/test.png");
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("The PNG file was created."));
};

addTextToImage("contributions.png");
