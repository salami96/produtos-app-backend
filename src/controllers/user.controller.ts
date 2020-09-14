import { Request, Response, NextFunction } from 'express';
import { User } from '../models/entities';
import { UserRepository } from '../models/repo/user.repo';


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
    static async getUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const uid: string = req.body;
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
    static async getError(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            return res.send('NOT OK');
        } catch (erro) {
            next(erro);
        }
    }
}
