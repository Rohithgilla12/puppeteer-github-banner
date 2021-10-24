import puppeteer from "puppeteer";
import { addTextToImage } from "./imageUtils";

const GITHUB_USERNAME = "Rohithgilla12";

const GITHUB_CONTRIBUTION_SELECTOR =
  "#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-9.mb-4.mb-md-0 > div:nth-child(2) > div > div.mt-4.position-relative > div > div.col-12.col-lg-10 > div.js-yearly-contributions > div:nth-child(1)";

const REMOVE_SELECTOR =
  "#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-9.mb-4.mb-md-0 > div:nth-child(2) > div > div.mt-4.position-relative > div > div.col-12.col-lg-10 > div.js-yearly-contributions > div:nth-child(1) > div > div > div > div.float-left";

const CONTRIBUTION_SELECTOR =
  "#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-9.mb-4.mb-md-0 > div:nth-child(2) > div > div.mt-4.position-relative > div > div.col-12.col-lg-10 > div.js-yearly-contributions > div:nth-child(1) > h2";

const main = async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 1 });

  await page.goto(`https://github.com/${GITHUB_USERNAME}`, {
    waitUntil: "networkidle2",
  });

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

  console.log("Done editing the screenshot!");
};

main();
