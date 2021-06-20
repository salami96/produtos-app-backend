import { Request, Response, NextFunction } from 'express';
import { Address, Category, Store } from '../models/entities';
import { StoreRepository } from '../models/repo/store.repo';

import fs from 'fs';
const cloudinary = require('cloudinary');

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
    static async saveNewCategory(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const c: Category = req.body;
            const categories = await StoreRepository.addCategory(c);
            if (categories){
                return res.json(categories);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async addData2Store(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { store, uid, type, name } = req.body;
            const result = await StoreRepository.addData2Store(store, uid, name, type);
            if (result){
                return res.json(result);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async updateStoreLogo(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            let { base64, code } = req.body;
            return cloudinary.v2.uploader.upload(base64, { public_id: 'logo-' + code }, async (err, result) => {
                if(err) {
                    return res.json(null);
                }
                res.send = result.secure_url;
            });
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
            // createPgto();
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
    static async getProperties(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const properties = await StoreRepository.getProperties();
            if (properties){
                return res.json(properties)
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async getStoresByOwner(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = req.params;
            const stores = await StoreRepository.getStoresByOwner(id);
            if (stores){
                return res.json(stores)
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async getStores(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const stores = await StoreRepository.getStores();
            if (stores){
                return res.json(stores)
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
}
import { PaymentModel } from '../models/schemas'
async function createPgto() {

    // PaymentModel.create({
    //     name: 'Dinheiro',
    //     icon: '<i-dollar-sign></i-dollar-sign>'
    // });
    // PaymentModel.create({
    //     name: 'Cartão',
    //     icon: '<i-card></i-card>'
    // });
    // PaymentModel.create({
    //     name: 'Tranferência',
    //     icon: '<i-share></i-share>'
    // });
    // await StoreRepository.addData2Store('copac', 'tABAB0RJu2SId2omqxylRqr6BcQ2', 'Dinheiro', 'payment');
    // await StoreRepository.addData2Store('copac', 'tABAB0RJu2SId2omqxylRqr6BcQ2', 'Cartão', 'payment');
    await StoreRepository.addData2Store('exemplo', '', 'Dinheiro', 'payment');
    await StoreRepository.addData2Store('exemplo', '', 'Cartão', 'payment');
    await StoreRepository.addData2Store('exemplo', '', 'Tranferência', 'payment');
}