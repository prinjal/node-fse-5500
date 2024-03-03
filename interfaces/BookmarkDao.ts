/**
 * @file Declares API for Bookmarks related data access object methods
 */

export default interface BookmarkDao {
    bookmarkTuit(tid: string, uid: string): Promise<any>;
    unbookmarkTuit(tid: string, uid: string): Promise<any>;
    findBookmarks(uid: string): Promise<any>;
}