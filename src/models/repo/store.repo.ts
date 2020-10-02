import { Address, Store } from "../entities";
import { StoreModel } from "../schemas";

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
        const resp = await StoreModel.findOneAndUpdate({ $and: [{ code: s.code }, { ownerUid: s.ownerUid }] }, s).exec();
        return resp;
    }
    static async addAddress2Store(a: Address, code: string, ownerUid: string): Promise<Store> {
        const store = await StoreModel.findOne({ $and: [{ code }, { ownerUid }] }).exec();
        if (store) {
            const found = store.address.find(ad => ad.name === a.name);
            if (found) {
                store.address.splice(store.address.lastIndexOf(found),1);
            }
            store.address.push(a);
            const resp = await this.updateStore(store);
            if (resp) {
                return await this.getStore(code);
            }
        }
        return null;
    }
    static async rmAddress(name: string, code: string, uid: string): Promise<Store> {
        const store = await StoreModel.findOne({ $and: [{ code }, { ownerUid: uid }] }).exec();
        if (store) {
            const found = store.address.find(ad => ad.name === name);
            if (found) {
                store.address.splice(store.address.lastIndexOf(found),1);
            }
            const resp = await this.updateStore(store);
            if (resp) {
                return await this.getStore(store.code);
            }
        }
        return null;
    }
    static async getStore(code: string): Promise<Store> {
        const store = await StoreModel.findOne({ code }).populate('payments categories').exec();
        if (store) store.ownerUid = null;
        return store;
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