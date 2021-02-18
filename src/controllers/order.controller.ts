import { Request, Response, NextFunction } from 'express';
import { Order } from '../models/entities';
import { OrderRepository } from '../models/repo/order.repo';

export class OrderController {
    static async saveNewOrder(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const o: Order = req.body;
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