"use strict";
/**
 * @file Implements bookmark class that stores all the fields pertaining to
 * a specific bookmarks.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Bookmark {
    constructor(data) {
        this.bookmarkedTuit = 0;
        this.bookmarkedBy = 0;
        this.bookmarkedTuit = data.bookmarkedTuit;
        this.bookmarkedBy = data.bookmarkedBy;
    }
}
exports.default = Bookmark;
