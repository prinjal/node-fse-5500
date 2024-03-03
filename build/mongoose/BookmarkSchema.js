"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for bookmarks
 */
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * @typedef Bookmark Represents the bookmark relation between a user and a tuit
 * @property {ObjectId} bookmarkedTuit The id of the tuit like by user
 * @property {ObjectId} bookmarkedBy The id of the user
 */
const BookmarkSchema = new mongoose_1.default.Schema({
    bookmarkedTuit: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Tuits", require: true },
    bookmarkedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "UserModel", require: true }
}, { collection: "bookmarks" });
exports.default = BookmarkSchema;
