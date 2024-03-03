"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BookmarkController {
    constructor(app, bookmarkDao) {
        this.bookmarkTuit = (req, res) => {
            this.bookmarkDao.bookmarkTuit(req.params.tid, req.params.uid)
                .then(bookmark => res.json(bookmark));
        };
        this.unbookmarkTuit = (req, res) => {
            this.bookmarkDao.unbookmarkTuit(req.params.tid, req.params.uid)
                .then(bookmark => res.json(bookmark));
        };
        this.findBookmarks = (req, res) => {
            this.bookmarkDao.findBookmarks(req.params.uid)
                .then(bookmark => res.json(bookmark));
        };
        this.app = app;
        this.bookmarkDao = bookmarkDao;
        this.app.post('/users/:uid/bookmarks/:tid', this.bookmarkTuit);
        this.app.get('/users/:uid/bookmarks', this.findBookmarks);
        this.app.delete('/users/:uid/bookmarks/:tid', this.unbookmarkTuit);
    }
}
exports.default = BookmarkController;
