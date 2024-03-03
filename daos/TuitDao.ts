import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";
import User from "../models/User";

export default class TuitDao implements TuitDaoI {

    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }
    async findTuitsByUser(uid: string): Promise<Tuit[] | null> {
        return await TuitModel.find({ postedBy: uid });
    }
    async findTuitsByID(tid: string): Promise<Tuit | null> {
        return await TuitModel.findById(tid);
    }
    async createTuit(tuit: Tuit, uid: string): Promise<any> {
        return await TuitModel.create({ ...tuit, postedBy: uid });
    }
    async updateTuit(tid: string, tuit: any): Promise<any> {
        return await TuitModel.updateOne({ _id: tid }, { $set: tuit });
    }

    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({ _id: tid });
    }

    async updateLikes
        (tid: string, newStats: any): Promise<any> {
        return await TuitModel.updateOne(
            { _id: tid },
            { $set: { stats: newStats } });

    }

}