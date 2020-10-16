import { Document, model, Schema } from "mongoose";
import { Category, Payment, Store, User, Product, Order, OrderItem } from "./entities";


interface UserDocument extends User, Document {}
export const UserModel = model<UserDocument>('User', new Schema({
    uid: { type: String },
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    address: [{
        name: { type: String },
        street: { type: String },
        number: { type: String },
        district: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
        reference: { type: String },
        complement: { type: String },
    }],
    avatar: { type: String },
}), 'users');


interface StoreDocument extends Store, Document {}
export const StoreModel = model<StoreDocument>('Store', new Schema({
    code: { type: String },
    title: { type: String },
    logo: { type: String },
    favicon: { type: String },
    slogan: { type: String },
    phone: { type: String },
    whatsapp: { type: String },
    fb: { type: String },
    insta: { type: String },
    email: { type: String },
    address: [{
        name: { type: String },
        street: { type: String },
        number: { type: String },
        district: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
        reference: { type: String },
        complement: { type: String },
    }],
    map: { type: String },
    directions: { type: String },
    payments: [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    ship: [{
        zipCode: { type: String },
        value: { type: Number }
    }],
    ownerUid: { type: String },
    color: { type: String },
}), 'stores');

interface PaymentDocument extends Payment, Document {}
export const PaymentModel = model<PaymentDocument>('Payment', new Schema({
    name: { type: String },
    icon: { type: String },
}), 'payments');

interface CategoryDocument extends Category, Document {}
export const CategoryModel = model<CategoryDocument>('Category', new Schema({
    name: { type: String },
    icon: { type: String },
}), 'categories');


interface ProductDocument extends Product, Document {}
export const ProductModel = model<ProductDocument>('Product', new Schema({
    cod: { type: String },
    store: { type: String },
    category: { type: String },
    name: { type: String },
    imgs: [{ type: String }],
    sizes: [{
        name: { type: String },
        value: { type: Number }
    }],
    unity: { type: String },
    extras: [{
        name: { type: String },
        value: { type: Number }
    }],
    optional: [{ type: String }]
}), 'products');


interface OrderItemDocument extends OrderItem, Document {}
export const OrderItemModel = model<OrderItemDocument>('OrderItem', new Schema({

}), 'orderItems');


interface OrderDocument extends Order, Document {}
export const OrderModel = model<OrderDocument>('Order', new Schema({
    cod: { type: Number },
    products: [{
        cod: { type: String },
        img: { type: String },
        name: { type: String },
        size: { type: String },
        total: { type: Number },
        value: { type: Number },
        extras: [{
            name: { type: String },
            value: { type: Number }
        }],
        removed: [{ type: String }],
        quantity: { type: Number },
        observations: { type: String }
    }],
    client: { type: Schema.Types.ObjectId, ref: 'User' },
    store: { type: Schema.Types.ObjectId, ref: 'Store' },
    date: { type: Date },
    payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
    address: {
        name: { type: String },
        street: { type: String },
        number: { type: String },
        district: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
        reference: { type: String },
        complement: { type: String },
    },
    status: { type: Number },
    total: { type: Number },
}), 'orders');