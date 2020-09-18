import { User } from "../entities";
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