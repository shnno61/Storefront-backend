import express, { Request, Response, Router } from "express";
import bodyParser from "body-parser";
import config from "./config";
import routes from "./routes";

const app: express.Application = express();
const address = "0.0.0.0:3000";
console.log(config.env);
app.use(bodyParser.json());

app.use("/store", routes);

app.listen(parseInt(config.sPort as string), function () {
  console.log(`starting app on: ${config.sPort}`);
});

export default app;
