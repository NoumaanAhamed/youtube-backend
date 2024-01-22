import express from "express";
import { jokes } from "./constants";

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/jokes", (req, res) => {
  res.send(jokes);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
