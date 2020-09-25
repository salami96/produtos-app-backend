import { Address, User } from "../entities";
import { UserModel } from "../schemas";

export class UserRepository {
    static async saveUser(u: User): Promise<User> {
        const users = await UserModel.find().exec();
        const found = users.find(user => user.uid === u.uid);
        if (found) {
            return found;
        } else {
            return await UserModel.create(u);
        }
    }
    static async updateUser(u: User): Promise<User> {
        const resp = await UserModel.findOneAndUpdate({ uid: u.uid }, u).exec();
        return resp;
    }
    static async addAddress2User(a: Address, uid: string): Promise<User> {
        const user = await UserModel.findOne({ uid: uid }).exec();
        if (user) {
            const found = user.address.find(ad => ad.name === a.name);
            if (found) {
                user.address.splice(user.address.lastIndexOf(found),1);
            }
            user.address.push(a);
            const resp = await this.updateUser(user);
            if (resp) {
                return await this.getUser(user.uid);
            }
        }
        return null;
    }
    static async rmAddress(name: string, uid: string): Promise<User> {
        const user = await UserModel.findOne({ uid: uid }).exec();
        if (user) {
            const found = user.address.find(ad => ad.name === name);
            if (found) {
                user.address.splice(user.address.lastIndexOf(found),1);
            }
            const resp = await this.updateUser(user);
            if (resp) {
                return await this.getUser(user.uid);
            }
        }
        return null;
    }
    static async getUser(uid: string): Promise<User> {
        const user = await UserModel.findOne({ uid: uid }).exec();
        return user;
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