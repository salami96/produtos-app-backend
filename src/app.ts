import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { router } from './routes';

export class App {
    private express: express.Application;
    private port = 9000;

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
                    throw new Error('Authorization header is required');
                } else {
                    if (req.headers.authorization === process.env.SECRET) {
                        next();
                    } else {
                        throw new Error('Authorization key is not valid');
                    }
                }
            } catch (error) {
                next(error.message);
            }
        });
        this.express.use('', router);
        this.express.listen(this.port, () => {
            console.log('Server running in port: ' + this.port);
        })
    }

    private database(): void {
        mongoose.connect(
            'mongodb+srv://salami1996:salami1996@cluster0-utam0.gcp.mongodb.net/produtos-app?retryWrites=true&w=majority',
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
