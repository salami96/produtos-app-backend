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
    static async updateStoreLogo(req: Request, res: Response, next: NextFunction) {
        try {
            const stream = cloudinary.uploader.upload_stream(async function(result) {
                if (result) {
                    return res.send(result.secure_url);
                } else {
                    return res.send('');
                }
            }, { public_id: 'logo-' + req.body.code } );
            fs.createReadStream(req.file.path).pipe(stream);
        } catch (erro) {
            next(erro);
        }
    }
    static async updateStore(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            let s = req.body;
            // console.log(s);
            // removePopulatedFields(s)
            // return res.json(null);
            // console.log(s);
            const store = await StoreRepository.updateStore(s);
            // console.log(store);
            if (store){
                return res.json(store);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async addAddress(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { address } = req.body;
            const resp = await StoreRepository.addAddress(address);
            if (resp) {
                return res.json(resp);
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
    static async getStoreCodes(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const codes = await StoreRepository.getStoreCodes();
            if (codes){
                return res.json(codes)
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
}
import { PaymentModel } from '../models/schemas'
import { removePopulatedFields } from './utils';
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