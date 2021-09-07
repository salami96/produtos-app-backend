import { Address, User } from "../entities";
import { UserModel } from "../schemas";
import { AddressRepository } from "./address.repo";

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
        return UserModel.findOneAndUpdate({ uid: u.uid }, u, { new: true }).exec();
    }
    static async addAddress2User(a: Address, uid: string): Promise<User> {
        const user = await UserModel.findOne({ uid: uid }).exec();
        const address = await AddressRepository.addAddress(a);
        if (user) {
            const found = user.address.find(ad => ad.name === a.name);
            if (found) {
                AddressRepository.rmAddress( user.address.splice(user.address.lastIndexOf(found),1)[0] );
            }
            user.address.push(address);
            return await this.updateUser(user);
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
            return await this.updateUser(user);
        }
        return null;
    }
    static async getUser(uid: string): Promise<User> {
        const user = await UserModel.findOne({ uid: uid }).populate('address').exec();
        return user;
    }
}