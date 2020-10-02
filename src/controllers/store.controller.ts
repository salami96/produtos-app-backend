import { Request, Response, NextFunction } from 'express';
import { Address, Store } from '../models/entities';
import { StoreRepository } from '../models/repo/store.repo';


export class StoreController {
    static async saveNewStore(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const s: Store = req.body;
            const store = await StoreRepository.saveStore(s);
            if (store){
                return res.json(store);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async updateStore(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const s = req.body;
            const store = await StoreRepository.updateStore(s);
            if (store){
                return res.json(store);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async address2Store(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const a: Address = req.body.address;
            const uid: string = req.body.uid;
            const code: string = req.body.code;
            const store = await StoreRepository.addAddress2Store(a, code, uid);
            if (store) {
                return res.json(store);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async rmAddress(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { name, uid, code } = req.params;
            const store = await StoreRepository.rmAddress(name, code, uid);
            if (store) {
                return res.json(store);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async getStore(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = req.params;
            const store = await StoreRepository.getStore(id);
            if (store){
                return res.json(store)
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
}
