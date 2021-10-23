import express from "express";
import puppeteer from "puppeteer-core";
// import puppeteer from "puppeteer";
import { addTextToImage } from "./imageUtils";

const app = express();
const port = process.env.PORT || 3000;

const GITHUB_USERNAME = "Rohithgilla12";

const GITHUB_CONTRIBUTION_SELECTOR =
  "#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-9.mb-4.mb-md-0 > div:nth-child(2) > div > div.mt-4.position-relative > div > div.col-12.col-lg-10 > div.js-yearly-contributions > div:nth-child(1)";

const REMOVE_SELECTOR =
  "#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-9.mb-4.mb-md-0 > div:nth-child(2) > div > div.mt-4.position-relative > div > div.col-12.col-lg-10 > div.js-yearly-contributions > div:nth-child(1) > div > div > div > div.float-left";

const CONTRIBUTION_SELECTOR =
  "#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-9.mb-4.mb-md-0 > div:nth-child(2) > div > div.mt-4.position-relative > div > div.col-12.col-lg-10 > div.js-yearly-contributions > div:nth-child(1) > h2";

const main = async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_BIN,
    args: [
      // Required for Docker version of Puppeteer
      "--no-sandbox",
      "--disable-setuid-sandbox",
      // This will write shared memory files into /tmp instead of /dev/shm,
      // because Docker’s default for /dev/shm is 64MB
      "--disable-dev-shm-usage",
    ],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 1 });

  await page.goto(`https://github.com/${GITHUB_USERNAME}`);

  // Dark Mode
  await page.emulateMediaFeatures([
    {
      name: "prefers-color-scheme",
      value: "dark",
    },
  ]);
  await page.waitForSelector(GITHUB_CONTRIBUTION_SELECTOR);

  // puppeteer hide the selected element
  await page.evaluate((selector) => {
    const element = document.querySelector(selector);
    element.style.display = "none";
  }, REMOVE_SELECTOR);

  await page.evaluate((selector) => {
    const element = document.querySelector(selector);
    element.style.margin = "8px";
    element.style.paddingTop = "16px";
  }, CONTRIBUTION_SELECTOR);

  const element = await page.$(GITHUB_CONTRIBUTION_SELECTOR);
  if (element) {
    await element.screenshot({ path: "contributions.png" });
  }

  await browser.close();

  console.log("Done creating the screenshot");

  await addTextToImage("contributions.png");

  console.log("Done editing the screenshot");

  // upload image on dev.to
};

app.get("/", (req: any, res: any) => {
  const greeting = "<h1>Hello From Node on Fly!</h1>";
  const name = req.params["name"];
  if (name) {
    res.send(greeting + "</br>and hello to " + name);
  } else {
    res.send(greeting);
  }
});

app.get("/api/image", async (_req: express.Request, res: express.Response) => {
  await main();
  res.sendFile(__dirname + "/final.png");
});

app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`));
