//Modules Import
import express, { Request, Response, NextFunction } from "express"
import serverResponse from "./utils/serverResponse";
import { Configs } from "./configs";
import { initializeDatabase } from "./database";
import cors from "cors";
import logger from "./utils/logger";
import { reqTracker } from "./middlewares/reqTracker";

//Modules Init
const app = express();
const api = require("./api");
const port = Configs.project.port

//Middlewares Init
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(reqTracker)
app.use(api);
app.use((req, res, next) => {
  serverResponse.handleError(
    req,
    res,
    "notFound",
    `a ${req.method} route ${req.originalUrl} is not defined`
  );
});
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  serverResponse.handleError(req, res, "internalServerError", error.message)
  console.log(error);
  next()
});

//Server Init
app.listen(port, async () => {
  logger.info(`${Configs.project.name}`)
  logger.info(`Server initiated on port ${port}`)
  await initializeDatabase();
  logger.info(`Server now listening on port ${port}`)
});

export default app