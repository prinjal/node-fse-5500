"use strict";
/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookmarkModel_1 = __importDefault(require("../mongoose/BookmarkModel"));
/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @implements {BookmarkDaoI} BookmarkDaoI
 */
class BookmarkDao {
    /**
     * Inserts bookmark instance into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    bookmarkTuit(tid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookmarkModel_1.default.create({ bookmarkedTuit: tid, bookmarkedBy: uid });
        });
    }
    /**
     * Remove bookmark instance from the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when bookmark is removed from the database
     */
    unbookmarkTuit(tid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookmarkModel_1.default.deleteOne({ bookmarkedTuit: tid, bookmarkedBy: uid });
        });
    }
    /**
     * Find all bookmarks of a specific user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when bookmark is removed from the database
     */
    findBookmarks(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookmarkModel_1.default.find({ bookmarkedBy: uid }).populate("bookmarkedTuit").exec();
        });
    }
}
exports.default = BookmarkDao;
