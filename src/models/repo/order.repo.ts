import { Order } from "../entities";
import { OrderModel } from "../schemas";

const populate = [{
    path: 'client',
    populate: {
        path: 'address'
    }
}, {
    path: 'address'
}, {
    path: 'payment'
}, {
    path: 'store'
}]

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
    static async getOrders(store: string): Promise<Order[]> {
        const resp = await OrderModel.find({ store }).populate(populate).exec();
        return resp;
    }
    static async getOrdersByUser(store: string, client: string): Promise<Order[]> {
        const resp = await OrderModel.find({ $and: [{ store }, { client }] }).populate(populate).exec();
        return resp;
    }
    static async getOrder(_id: string): Promise<Order> {
        const order = await OrderModel.findOne({ _id }).populate(populate).exec();
        return order;
    }
    static async updateOrder(_id: string, status: number): Promise<Order> {
        return await OrderModel.findOneAndUpdate({ _id }, { status }, { new: true } ).exec();
    }
}