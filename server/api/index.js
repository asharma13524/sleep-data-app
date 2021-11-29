const datafetch = require("../services/datafetch");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

app.get('/fetch-data', async (req, res, next) => {
  // TODO: ONLY GRAB DATA NEEDED BASED ON USER
  try {
    const data = await datafetch.fetchData();
    return res.json(data);
  } catch (error) {
      return next(error)
  }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});