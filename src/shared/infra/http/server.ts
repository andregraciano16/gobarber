import 'reflect-metadata';
import 'dotenv/config';

import '@shared/container';
import 'express-async-errors';
import '../typeorm';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import {errors} from 'celebrate';

import routes from './routes';
import uploadConfig from '../../../config/upload';
import AppError from '../../error/AppError';
import rateLimiter from './middlewares/rateLimiter';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message,
            });
        }
        console.error(err);
        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    },
);

app.listen(3333, () => console.log(' Server started on port 3333!'));
