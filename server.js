import express from "express";
import { apiRouter } from "./router/route.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

app.use(apiRouter);

app.listen(3000, () => {
  console.log("Server started");
});
