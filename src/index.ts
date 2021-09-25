const puppeteer = require("puppeteer");

const GITHUB_USERNAME = "Rohithgilla12";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://github.com/${GITHUB_USERNAME}`);

  await page.waitForSelector(
    "#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-9.mb-4.mb-md-0 > div:nth-child(2) > div > div.mt-4.position-relative > div > div.col-12.col-lg-10 > div.js-yearly-contributions > div:nth-child(1)"
  );
  const element = await page.$(
    "#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-9.mb-4.mb-md-0 > div:nth-child(2) > div > div.mt-4.position-relative > div > div.col-12.col-lg-10 > div.js-yearly-contributions > div:nth-child(1)"
  );

  await element.screenshot({ path: "contributions.png" });

  await browser.close();

  console.log("Done");
};

main();
