"use strict";
/**
 * @file Implements mongoose schema for tuits
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// const Tuit = require("../models/Tuit");
/**
 * @typedef Tuit Represents the tuit object
 * @property {string} tuit The content of the tuit
 * @property {ObjectId} postedBy The user that posted the tuit
 * @property {ObjectId} comments The comments on the tuits which will be tuits themselves
 * reply, retuit, and like
 */
const TuitSchema = new mongoose_1.default.Schema({
    tuit: { type: String, required: true },
    postedOn: Date,
    postedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserModel', required: true },
    comments: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Tuit' }],
    stats: {
        replies: { type: Number, default: 0 },
        retuits: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 }
    },
    likes: Number
}, { collection: 'tuits' });
exports.default = TuitSchema;
