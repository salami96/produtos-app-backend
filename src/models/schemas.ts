import { Document, model, Schema } from "mongoose";
import { Category, Payment, Store, User } from "./entities";


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
    payments: [{
        id: { type: Schema.Types.ObjectId, ref: 'payments' }
    }],
    categories: [{
        id: { type: Schema.Types.ObjectId, ref: 'categories' }
    }],
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