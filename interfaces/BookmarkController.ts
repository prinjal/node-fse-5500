/**
 * @file Declares RESTful API for Bookmarks resource
 */

import { Request, Response } from "express";

export default interface BookmarkController {
    bookmarkTuit(req: Request, res: Response): void;
    unbookmarkTuit(req: Request, res: Response): void;
    findBookmarks(req: Request, res: Response): void;
}