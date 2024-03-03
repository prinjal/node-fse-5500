import { Request, Response, Express } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import FollowsDao from "../daos/FollowsDao";
import FollowsControllerI from "../interfaces/FollowsController";

export default class FollowsController implements FollowsControllerI {

    app: Express;
    followsDao: FollowsDao;
    constructor(app: Express, followsDao: FollowsDao) {
        this.app = app;
        this.followsDao = followsDao;
        this.app.get('/users/:followedBy/following', this.getFollowing);
        this.app.get('/users/:followedBy/followers', this.getFollowers);
        this.app.post('/users/:followedBy/follow/:following', this.followUser);
        this.app.delete('/users/:followedBy/follow/:following', this.unfollowUser);
    }



    followUser = (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
        this.followsDao.followUser(req.params.followedBy, req.params.following)
            .then(follows => res.json(follows));
    }
    unfollowUser = (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
        this.followsDao.unfollowUser(req.params.followedBy, req.params.following)
            .then(follows => res.json(follows));
    }
    getFollowers = (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
        this.followsDao.getFollowers(req.params.followedBy)
            .then(users => res.json(users));
    }
    getFollowing = (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
        this.followsDao.getFollowing(req.params.followedBy)
            .then(users => res.json(users));
    }

}