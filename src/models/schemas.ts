import { Document, model, Schema } from "mongoose";
import { User } from "./entities";

interface UserDocument extends User, Document {}

export const UserModel = model<UserDocument>('User', new Schema({
    uid: { type: String},
    name: { type: String},
    phone: { type: String},
    email: { type: String},
    address: [{
        name: { type: String },
        street: { type: String },
        number: { type: String },
        district: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
    }],
    avatar: { type: String},
}), 'users');