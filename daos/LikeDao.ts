import LikeDaoI from "../interfaces/LikeDao";
import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    findAllUsersThatLikedTuitCount = async (tid: string): Promise<any> => {
        return await LikeModel.count({ tuit: tid });
    }
    findAllUsersThatLikedTuit = async (tid: string): Promise<any> => {
        return await LikeModel
            .find({ tuit: tid })
            .populate("likedBy")
            .exec();
    }

    findAllTuitsLikedByUser = async (uid: string): Promise<any> => {
        return await LikeModel
            .find({ likedBy: uid })
            .populate("tuit")
            .exec();
    }

    userLikesTuit = async (uid: string, tid: string): Promise<any> => {
        return await LikeModel.create({ tuit: tid, likedBy: uid });
    }

    userUnlikesTuit = async (uid: string, tid: string): Promise<any> => {
        return await LikeModel.deleteOne({ tuit: tid, likedBy: uid });
    }

    findUserLikesTuit = async (uid: string, tid: string): Promise<any> =>{
        return await LikeModel.findOne({ tuit: tid, likedBy: uid });
    }

    

}