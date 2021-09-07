import { Address } from "../entities";
import { AddressModel } from "../schemas";


export class AddressRepository {
    static async addAddress(a: Address): Promise<Address> {
        return await AddressModel.create(a);
    }
    static async rmAddress(a: Address): Promise<Address> {
        return await AddressModel.findOneAndRemove(a).exec();
    }
}