
/**
 * @file Implements mongoose schema for tuits
 */

import mongoose from "mongoose";
import Tuit from "../models/Tuit";
import User from "../models/User";
// const Tuit = require("../models/Tuit");

/**
 * @typedef Tuit Represents the tuit object
 * @property {string} tuit The content of the tuit
 * @property {ObjectId} postedBy The user that posted the tuit
 * @property {ObjectId} comments The comments on the tuits which will be tuits themselves
 * reply, retuit, and like
 */
const TuitSchema = new mongoose.Schema({
    tuit: { type: String, required: true },
    postedOn: Date,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tuit' }],
    stats: {
        replies: { type: Number, default: 0 },
        retuits: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 }
    },    
    likes: Number
}, { collection: 'tuits' });

export default TuitSchema;