import sizeOf from "image-size";
import sharp from "sharp";

export const addTextToImage = async (filename: string) => {
  // resize is required only for first time
  //   await sharp("base.png").resize(1000, 420).toFile("resize_base.png");
  const beforeResize: any = sizeOf(filename);

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
};

// addTextToImage("contributions.png");
