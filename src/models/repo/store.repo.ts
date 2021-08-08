import { Document } from "mongoose";
import { Address, Category, Payment, Store } from "../entities";
import { AddressModel, CategoryModel, PaymentModel, StoreModel } from "../schemas";

const populated = 'categories payments address';

export class StoreRepository {
    static async saveStore(s: Store): Promise<Store> {
        const stores = await StoreModel.find().exec();
        const found = stores.find(store => store.code === s.code);
        if (found) {
            return found;
        } else {
            return await StoreModel.create(s);
        }
    }
    static async updateStore(s: Store): Promise<Store> {
        return await StoreModel.findOneAndUpdate({ $and: [{ code: s.code }, { ownerUid: s.ownerUid }] }, s, { new: true }).populate(populated).exec();
    }
    static async addAddress(a: Address): Promise<Address> {
        return await AddressModel.create(a);
    }
    static async rmAddress(name: string, code: string, uid: string): Promise<Store> {
        const store = await StoreModel.findOne({ $and: [{ code }, { ownerUid: uid }] }).exec();
        if (store) {
            const found = store.address.find(ad => ad.name === name);
            if (found) {
                store.address.splice(store.address.lastIndexOf(found),1);
            }
            return await this.updateStore(store);
        }
        return null;
    }
    static async getStoreCodes(): Promise<string[]> {
        let stores = await StoreModel.find().exec();
        return [...stores.map(s => s.code), 'www', 'admin' ];
    }
    static async getStores(): Promise<Store[]> {
        const store = await StoreModel.find().populate(populated).exec();
        if (store) store.forEach(s => s.ownerUid = null);
        return store;
    }
    static async getProperties(): Promise<{ p: Payment[] ; c: Category[] }> {
        let resp = {
            p: await PaymentModel.find().exec(),
            c: await CategoryModel.find().exec()
        }
        return resp;
    }
    static async getStoresByOwner(ownerUid: string): Promise<Store[]> {
        let store;
        if (ownerUid == 'tABAB0RJu2SId2omqxylRqr6BcQ2') {
            store = await StoreModel.find().populate(populated).exec();
        } else {
            store = await StoreModel.find({ ownerUid }).populate(populated).exec();
            if (store) store.forEach(s => s.ownerUid = null);
        }
        return store;
    }
    static async getStore(code: string): Promise<Store> {
        const store = await StoreModel.findOne({ code }).populate(populated).exec();
        if (store) {
            store.ownerUid = null;
            return store;
        } else {
            return await StoreModel.findOne({ code: 'exemplo' }).populate(populated).exec();
        }
    }
    static async addData2Store(s: string, uid: string, name: string, type: string): Promise<Store> {
        const doc = await StoreModel.findOne({ $and: [{ code: s },{ ownerUid: uid }]}).exec();
        console.log(doc);
        if (doc) {
            if (type == 'category') {
                const obj = await CategoryModel.findOne({ name }).exec();
                if (!doc.categories.includes(obj._id)) doc.categories.push(obj._id);
            }
            if (type == 'payment') {
                const obj = await PaymentModel.findOne({ name }).exec();
                if (!doc.payments.includes(obj._id)) doc.payments.push(obj._id);
            }
            return await this.updateStore(doc);
        }
        return null;
    }
    static async addCategory(c: Category): Promise<Category[]> {
        const categories = await CategoryModel.find().exec();
        const found = categories.find(el => c.name === el.name);
        if (!found) {
            const doc = await CategoryModel.create(c);
            categories.push(doc);
        }
        return await CategoryModel.find().exec();
    }
/*     static async allRecords(): Promise<User[]> {
        const users: User[] = await UserModel.find().lean().sort({ 'data': -1 }).exec();
        return users
    }
    static async limparRegistros(): Promise<boolean> {
        let resultado = await UserModel.deleteMany({});
        return resultado;
    }
    static async limparRegistro(id: string): Promise<boolean> {
        let resp = await UserModel.findOneAndRemove({ '_id': id }).lean().exec();
        return resp;
    } */
}