/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Request, Response, NextFunction } from 'express';
import { Address, User } from '../models/entities';
import { UserRepository } from '../models/repo/user.repo';

const fs = require('fs');
const cloudinary = require('cloudinary');

export class UserController {
    static async saveNewUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const u: User = req.body;
            const user = await UserRepository.saveUser(u);
            if (user){
                return res.json(user);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async updateUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const u: User = req.body;
            const user = await UserRepository.updateUser(u);
            if (user){
                return res.json(user);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async updateUserPhoto(req: Request, res: Response, next: NextFunction) {
        try {
            const u: User = req.body;
            const stream = cloudinary.uploader.upload_stream(async function(result) {
                u.avatar = result.secure_url;
                const user = await UserRepository.updateUser(u);
                if (user){
                    return res.json(user);
                } else {
                    return res.json(null);
                }
            }, { public_id: 'avatar-' + req.body.uid } );
            fs.createReadStream((req as any).file.path, {encoding: 'binary'}).on('data', stream.write).on('end', stream.end);
        } catch (erro) {
            next(erro);
        }
    }
    static async address2User(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const a: Address = req.body.address;
            const uid: string = req.body.uid;
            const user = await UserRepository.addAddress2User(a, uid);
            if (user) {
                return res.json(user);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async rmAddress(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { name, uid } = req.params;
            console.log(name);
            const user = await UserRepository.rmAddress(name, uid);
            if (user) {
                return res.json(user);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async getUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { uid } = req.params;
            const user = await UserRepository.getUser(uid);
            if (user){
                return res.json(user)
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async get(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            return res.send('OK');
        } catch (erro) {
            next(erro);
        }
    }
}
