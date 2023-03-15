import { Router } from 'express';
import { RegisterRoutes } from '../../dist/routes';
import { AuthController } from './AuthController';

// **** Variables **** //

const apiRouter = Router();

// **** Setup **** //

const authRouter = Router();

RegisterRoutes(authRouter);

const authController = new AuthController();

// Login user
authRouter.post('/login', authController.login);

// Logout user
authRouter.get('/logout', authController.logout);

apiRouter.use('/api', authRouter);

// **** Export default **** //

export default apiRouter;
