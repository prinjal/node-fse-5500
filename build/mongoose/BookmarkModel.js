"use strict";
/**
 * @file Implements mongoose model to CRUD
 * documents in the bookmarks collection
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BookmarkSchema_1 = __importDefault(require("./BookmarkSchema"));
const BookmarkModel = mongoose_1.default.model('Bookmark', BookmarkSchema_1.default);
exports.default = BookmarkModel;
