/**
 * @file Implements mongoose schema for follows
 */
import mongoose, { Mongoose } from "mongoose";
import Follows from "../models/Follow";


/**
 * @typedef Follow Represents the follow relation between one user and the other user
 * @property {ObjectId} userFollowing The id of the user that follows the other user
 * @property {ObjectId} userFollowed The id of the user that is followed by the other user
 */
const FollowSchema = new mongoose.Schema<Follows>({
    userFollowed: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
    userFollowing: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true }
}, { collection: 'follows' });

export default FollowSchema;