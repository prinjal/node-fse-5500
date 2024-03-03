/**
 * @file Implements bookmark class that stores all the fields pertaining to
 * a specific bookmarks.
 */

export default class Bookmark {
    private bookmarkedTuit: Number = 0;
    private bookmarkedBy: Number = 0;
    constructor(data: any) {
        this.bookmarkedTuit = data.bookmarkedTuit;
        this.bookmarkedBy = data.bookmarkedBy;
    }
}