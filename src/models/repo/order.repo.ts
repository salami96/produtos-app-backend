import { Order, Store, User } from "../entities";
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
    static async getOrders(store: Store): Promise<Order[]> {
        // const store = await StoreModel.findById(storeId)
        return await OrderModel.find({ store }).populate(populate).exec();
    }
    static async getOrdersByUser(store: Store, client: User): Promise<Order[]> {
        // const store = await StoreModel.findById(storeId);
        // const client = await UserModel.findById(clientId);
        return await OrderModel.find({ store, client }).populate(populate).exec();
    }
    static async getOrder(_id: string): Promise<Order> {
        const order = await OrderModel.findOne({ _id }).populate(populate).exec();
        return order;
    }
    static async updateOrderStatus(_id: string, status: number): Promise<Order> {
        let doc = await OrderModel.findOne({ _id }).populate(populate).exec();
        doc.status = status;
        (doc.date as any).set(status, new Date().toString());
        return doc.save();
    }
    static async updateOrder(_id: string, order: Order): Promise<Order> {
        return await OrderModel.findOneAndUpdate({ _id }, order).populate(populate).exec();
    }
}