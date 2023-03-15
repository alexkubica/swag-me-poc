/**
 * Setup express server.
 */

import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import logger from 'jet-logger';
import morgan from 'morgan';
import swagger from '../dist/swagger.json';

import 'express-async-errors';

import BaseRouter from '@src/routes/api';

import EnvVars from '@src/constants/EnvVars';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import swaggerUi from 'swagger-ui-express';

import { NodeEnvs } from '@src/constants/misc';

// **** Variables **** //

const app = express();

// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}

// Add APIs, must be after middleware
app.use('/api', BaseRouter);

// Add error handler
app.use((err: Error, _: Request, res: Response) => {
  if (EnvVars.NodeEnv !== NodeEnvs.Test) {
    logger.err(err, true);
  }
  const status = HttpStatusCodes.BAD_REQUEST;
  // if (err instanceof RouteError) {
  //   status = err.status;
  // }
  return res.status(status).json({ error: err.message });
});

app.use('/api-docs', swaggerUi.serve, (_req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(swagger));
});

// Nav to login pg by default
app.get('/', (_: Request, res: Response) => {
  res.sendFile('go to /api-docs');
});

export default app;
