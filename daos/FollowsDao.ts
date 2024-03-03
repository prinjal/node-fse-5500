import mongoose from "mongoose";
import FollowsDaoI from "../interfaces/FollowsDao";
import Follow from "../models/Follow";
import User from "../models/User";
import FollowModel from "../mongoose/FollowModel";

export default class FollowsDao implements FollowsDaoI {
    async followUser(followedBy: string, following: string): Promise<any> {
        return await FollowModel.create({ userFollowed: followedBy, userFollowing: following });
    }
    async unfollowUser(followedBy: string, following: string): Promise<any> {
        return await FollowModel.deleteOne({ userFollowed: followedBy, userFollowing: following });
    }
    async getFollowers(uid: string): Promise<any> {
        return await FollowModel.find({userFollowed : uid }).populate("userFollowing").exec();
    }
    async getFollowing(uid: string): Promise<any> {
        return await FollowModel.find({userFollowing : uid }).populate("userFollowed").exec();
    }

}