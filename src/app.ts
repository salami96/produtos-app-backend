import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { router } from './routes';
import { mongoUrl, port, secret } from '../enviroment';

export class App {
    private express: express.Application;

    constructor() {
        this.express = express();
        this.listen();
        this.middlewares();
        this.database();
    }

    public getApp(): express.Application {
        return this.express;
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(this.forceSSL);
    }
    
    private listen(): void {
        this.express.use(async (req, res, next) => {
            try {
                if (!req.headers.authorization) {
                    res.statusCode = 403;
                    return res.send('Authorization key is required');
                } else {
                    if (req.headers.authorization === secret) {
                        next();
                    } else {
                        res.statusCode = 403;
                        return res.send('Authorization key is not valid');
                    }
                }
            } catch (error) {
                next(error.message);
            }
        });
        this.express.use('/', router);
        this.express.listen(port, () => {
            console.log('Server running in port: ' + port);
        })
    }

    private database(): void {
        mongoose.connect(
            mongoUrl,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }
        );
    }

    forceSSL = function() {
        return function (req: express.Request, res: express.Response, next: express.NextFunction): void {
            if (req.headers['x-forwarded-proto'] !== 'https') {
                return res.redirect(
                    ['https://', req.get('Host'), req.url].join('')
                );
            }
            next();
        }
    }
}
