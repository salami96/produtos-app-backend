import { Order } from "../entities";
import { OrderModel } from "../schemas";

export class OrderRepository {
    static async saveOrder(o: Order): Promise<Order> {
        const orders = await OrderModel.find({ store: o.store }).sort('cod').exec();
        if (orders.length > 0) {
            o.cod = orders.pop().cod + 1;
        } else {
            o.cod = 0;
        }
        return await OrderModel.create(o);
    }
    static async getOrders(store: string, status: number): Promise<Order[]> {
        const resp = await OrderModel.find({ $and: [{ store }, { status } ] }).populate('client payment').exec();
        return resp;
    }
    static async getOrdersByUser(store: string, client: string): Promise<Order[]> {
        const resp = await OrderModel.find({ $and: [{ store }, { client }] }).populate('store payment').exec();
        return resp;
    }
    static async getOrder(_id: string): Promise<Order> {
        const order = await OrderModel.findOne({ _id }).populate('store payment client').exec();
        return order;
    }
    static async updateOrder(_id: string, status: number): Promise<Order> {
        return await OrderModel.findOneAndUpdate({ _id }, { status }, { new: true } ).exec();
    }
}