const axios = require("axios");
const cheerio = require("cheerio");

async function t4tutorialsearch(query) {
  const resstr = query.split(" ").join("+");
  console.log(resstr);
  const Articles = [];
  const URL = `https://t4tutorials.com/?s=${resstr}`;

  const res = await axios.get(URL);
  const html = res.data;
  const $ = cheerio.load(html);

  const articles = $("article");

  if (articles.length > 0) {
    articles.each((i, e) => {
      const articletitle = $(e)
        .children("header")
        .children("h1")
        .children("a")
        .text();
      const articlelink = $(e)
        .children("header")
        .children("h1")
        .children("a")
        .attr("href");
      const articlebody = $(e).children(".entry-summary").children("p").text();

      const articleobj = {
        title: articletitle,
        link: articlelink,
        body: articlebody,
      };

      Articles.push(articleobj);
    });

    return {
      Articles: Articles,
    };
  } else {
    return {
      Msg: "No Result Found",
    };
  }
}

module.exports = t4tutorialsearch;
