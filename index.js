const express = require("express");
const t4tutorialsearch = require("./t4tutorialscrap");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({
    Msg: "Welcome to t4tutorial search platform",
  });
});

app.post("/search", (req, res) => {
  console.log(req.body);
  const query = req.body.query;

  t4tutorialsearch(query).then((response) => {
    if (response.Msg) {
      console.log("nothing");
      res.json({
        Msg: response.Msg,
      });
    } else if (response.Articles) {
      console.log("Articles");
      res.json({
        Articles: response.Articles,
      });
    }
  });
});
