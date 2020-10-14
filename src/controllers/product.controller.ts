import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/entities';
import { ProductRepository } from '../models/repo/product.repo';

export class ProductController {
    static async saveNewProduct(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const p: Product = req.body;
            const { uid } = req.body;
            const product = await ProductRepository.saveProduct(p, p.store, uid);
            if (product){
                return res.json(product);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async updateProduct(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { uid } = req.body;
            const p: Product = req.body;
            const product = await ProductRepository.updateProduct(p, p.store, uid);
            if (product){
                return res.json(product);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { store, uid, cod } = req.params;
            const product = await ProductRepository.deleteProduct(cod, store, uid);
            if (product){
                return res.json(product);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async getProduct(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            // createPgto();
            const { cod, store } = req.params;
            const product = await ProductRepository.getProduct(cod, store);
            if (product){
                return res.json(product)
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async getProducts(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { store } = req.params;
            console.log('prod:' + store);
            const products = await ProductRepository.getProducts(store);
            if (products){
                return res.json(products)
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
}
