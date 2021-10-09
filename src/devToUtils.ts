require("dotenv").config();
import axios from "axios";
// import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import { Article } from "./types/article";

const DEV_TO_SLUG =
  "gillarohith/simple-way-to-convert-existing-html-web-application-to-a-pwa-5127";

const DEV_TO_API_URL = `https://dev.to/api/articles/`;

// const SUPABASE_STORAGE_URL = `https://ojypoeaurgrxpqimtnxw.supabase.in/storage/v1/object/public/`;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

console.log(supabase);

export const getArticleID = async () => {
  const { data: responseData } = await axios.get(
    `${DEV_TO_API_URL}/${DEV_TO_SLUG}`
  );
  const articleData = responseData as Article;

  const articleID = articleData.id;

  console.log(articleID);
  return { articleID, articleData };
};

export const updateArticle = async () => {
  const { articleID, articleData } = await getArticleID();
  console.log(articleID);

  // const buffer = fs.readFileSync("./final.png");
  // const { data, error } = await supabase.storage
  //   .from("dev-to-banner")
  //   .upload("public/banner-6.png", buffer);

  // const uploadUrl = `${SUPABASE_STORAGE_URL}${data?.Key}`;
  const uploadUrl =
    "https://ojypoeaurgrxpqimtnxw.supabase.in/storage/v1/object/public/dev-to-banner/public/banner-1.png";
  const putData = await axios.put(
    `${DEV_TO_API_URL}${articleID}`,
    {
      article: {
        ...articleData,
        social_image: uploadUrl,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.DEV_TO_API_KEY,
      },
    }
  );
  console.log(putData);
  // if (error) {
  // }
};

updateArticle();
// ARTICLE_ID =287424;
