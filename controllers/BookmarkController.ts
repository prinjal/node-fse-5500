import { Request, Response, Express } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkController";

export default class BookmarkController implements BookmarkControllerI {
    app: Express;
    bookmarkDao: BookmarkDao;
    constructor(app: Express, bookmarkDao: BookmarkDao) {
        this.app = app;
        this.bookmarkDao = bookmarkDao;
        this.app.post('/users/:uid/bookmarks/:tid', this.bookmarkTuit);
        this.app.get('/users/:uid/bookmarks', this.findBookmarks);
        this.app.delete('/users/:uid/bookmarks/:tid', this.unbookmarkTuit);
    }


    bookmarkTuit = (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
        this.bookmarkDao.bookmarkTuit(req.params.tid, req.params.uid)
            .then(bookmark => res.json(bookmark));
    }
    unbookmarkTuit = (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
        this.bookmarkDao.unbookmarkTuit(req.params.tid, req.params.uid)
            .then(bookmark => res.json(bookmark));
    }
    findBookmarks = (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
        this.bookmarkDao.findBookmarks(req.params.uid)
            .then(bookmark => res.json(bookmark));
    }

}