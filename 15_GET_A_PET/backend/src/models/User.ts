import mongoose from "mongoose";

interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password?: string;
    image?: string;
    phone: string;
}

const User = mongoose.model<IUser>('User', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}));

export default User;
export type { IUser };