/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */

import BookmarkDaoI from "../interfaces/BookmarkDao";
import BookmarkModel from "../mongoose/BookmarkModel";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @implements {BookmarkDaoI} BookmarkDaoI
 */

export default class BookmarkDao implements BookmarkDaoI {

    /**
     * Inserts bookmark instance into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when bookmark is inserted into the database
     */

    async bookmarkTuit(tid: string, uid: string): Promise<any> {
        return await BookmarkModel.create({ bookmarkedTuit: tid, bookmarkedBy: uid });
    }

    /**
     * Remove bookmark instance from the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when bookmark is removed from the database
     */

    async unbookmarkTuit(tid: string, uid: string): Promise<any> {
        return await BookmarkModel.deleteOne({ bookmarkedTuit: tid, bookmarkedBy: uid });
    }


    /**
     * Find all bookmarks of a specific user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when bookmark is removed from the database
     */
    async findBookmarks(uid: string): Promise<any> {
        return await BookmarkModel.find({ bookmarkedBy: uid }).populate("bookmarkedTuit").exec();
    }

}