import { Request, Response, NextFunction } from 'express';
import { Order } from '../models/entities';
import { OrderRepository } from '../models/repo/order.repo';

export class OrderController {
    static async saveNewOrder(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const o: Order = req.body;
            o.date[0] = new Date();
            o.date[1] = undefined;
            o.date[2] = undefined;
            o.date[3] = undefined;
            o.date[4] = undefined;
            o.date[5] = undefined;
            const order = await OrderRepository.saveOrder(o);
            if (order){
                return res.json(order);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async updateOrder(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { cod, status } = req.body;
            const order = await OrderRepository.updateOrder(cod, status);
            if (order){
                return res.json(order);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async getOrder(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { cod } = req.params;
            const order = await OrderRepository.getOrder(cod);
            if (order){
                return res.json(order)
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async getOrders(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { store } = req.params;
            const orders = await OrderRepository.getOrders(store);
            if (orders){
                return res.json(orders)
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async getOrdersByClient(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { store, client } = req.params;
            const orders = await OrderRepository.getOrdersByUser(store, client);
            if (orders){
                return res.json(orders)
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
}