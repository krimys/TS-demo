import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/';
import mongoose from 'mongoose';
import config from './config/config';
import logger from './config/logger';
import cors from 'cors';
import { appendFile } from 'fs';
const cloudinary = require('cloudinary').v2;
import fileUpload from 'express-fileupload';

const router: Express = express();

router.use(morgan('dev'));

router.use(express.urlencoded({ extended: false }));

router.use(express.json());

router.use(cors());

router.use('/', routes);

router.use((req, res, next) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message,
  });
});

cloudinary.config({
  secure: true,
});

// router.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );

const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
let server: any;
mongoose.connect(config.mongoose.url).then(result => {
  // logger.info(`Connected to MongoDB -${config.mongoose.url}`);
  server = httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
});

mongoose.set('debug', true);
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info(' received');
  if (server) {
    server.close();
  }
});
