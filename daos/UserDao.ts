import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

export default class UserDao implements UserDaoI {
    
    async findAllUsers(): Promise<User[]> {
        return await UserModel.find();
    }
    async findUserByName(username: String): Promise<any> {
        return await UserModel.findOne({ username: username });
    }
    async findUserById(uid: string): Promise<any> {
        return await UserModel.findById(uid);
    }
    async createUser(user: any): Promise<any> {
        return await UserModel.create(user);
    }
    async updateUser(uid: string, user: any): Promise<any> {
        return await UserModel.updateOne({ _id: uid }, { $set: user });
    }
    async deleteUser(uid: string): Promise<any> {
        return await UserModel.deleteOne({ _id: uid });
    }

    async deleteUserByUserName(userName: string): Promise<any> {
        return await UserModel.deleteMany({username:userName});
    }

}