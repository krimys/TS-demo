import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";

import routes from "./routes/";
import logger from "./config/logger";

const router: Express = express();

/** Logging */
router.use(morgan("dev"));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

router.use(
  cors({
    origin: "*",
  })
);

/** Routes */
router.use("/", routes);

/** Error handling */
router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: number | string = process.env.PORT ?? 6060;
// let server: object;

httpServer.listen(PORT, () =>
  console.info(`The server is running on port ${PORT}`)
);

const exitHandler = () => {
  if (httpServer) {
    httpServer.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: object) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info(" received");
  if (httpServer) {
    httpServer.close();
  }
});
