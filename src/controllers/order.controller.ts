import { Request, Response, NextFunction } from 'express';
import { Order } from '../models/entities';
import { OrderRepository } from '../models/repo/order.repo';
const { sendMessage, send } = require('../websocket');

export class OrderController {
    static async saveNewOrder(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            let o: Order = req.body;
            o.date[0] = new Date();
            o.date[1] = undefined;
            o.date[2] = undefined;
            o.date[3] = undefined;
            o.date[4] = undefined;
            o.date[5] = undefined;
            const order = await OrderRepository.saveOrder(o);
            if (order){
                sendMessage(`orders-to-${order.store}`, await OrderRepository.getOrders(order.store));
                return res.json({status: true, msg: 'Pedido criado com sucesso!', id: order._id});
            } else {
                return res.json({status: false, msg: 'Houve um problema ao criar o seu pedido!'});
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async updateOrderStatus(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { cod, status } = req.body;
            const order = await OrderRepository.updateOrderStatus(cod, status);
            if (order){
                sendMessage(`changes-on-${order._id}`, order)
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
            const { order } = req.body;
            const { id } = req.params;
            const resp = await OrderRepository.updateOrder(id, order);
            if (resp){
                sendMessage(`changes-on-${resp._id}`, order)
                return res.json(resp);
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
            const orders = await OrderRepository.getOrders(store as any);
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
            const orders = await OrderRepository.getOrdersByUser(store as any, client as any);
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