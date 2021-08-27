import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/entities';
import { ImageRepository } from '../models/repo/image.repo';
import { ProductRepository } from '../models/repo/product.repo';

const cloudinary = require('cloudinary');

export class ProductController {
    static async saveNewProduct(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const product: Product = JSON.parse(req.body.product);
            const uid = req.body.uid;
            const files: any = req.files;
            product.imgs = await ImageRepository.saveImages(files, `${product.store}/${product.cod}`);
            const resp = await ProductRepository.saveProduct(product, product.store, uid);
            if (resp){
                return res.json(resp);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async productImages(req: Request, res: Response, next: NextFunction) {
        try {
            const files: any = req.files
            let urls = ImageRepository.saveImages(files, req.body.folder + "/" + req.body.cod);
            return res.json({ status: true, urls });
        } catch (erro) {
            next(erro);
        }
    }
    static async updateProduct(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { uid, product } = req.body;
            const result = await ProductRepository.updateProduct(product, product.store, uid);
            if (result){
                return res.json(result);
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
            const all = req.query.all == 'true';
            const products = await ProductRepository.getProducts(store, all);
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
