"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FollowsController {
    constructor(app, followsDao) {
        this.followUser = (req, res) => {
            this.followsDao.followUser(req.params.followedBy, req.params.following)
                .then(follows => res.json(follows));
        };
        this.unfollowUser = (req, res) => {
            this.followsDao.unfollowUser(req.params.followedBy, req.params.following)
                .then(follows => res.json(follows));
        };
        this.getFollowers = (req, res) => {
            this.followsDao.getFollowers(req.params.followedBy)
                .then(users => res.json(users));
        };
        this.getFollowing = (req, res) => {
            this.followsDao.getFollowing(req.params.followedBy)
                .then(users => res.json(users));
        };
        this.app = app;
        this.followsDao = followsDao;
        this.app.get('/users/:followedBy/following', this.getFollowing);
        this.app.get('/users/:followedBy/followers', this.getFollowers);
        this.app.post('/users/:followedBy/follow/:following', this.followUser);
        this.app.delete('/users/:followedBy/follow/:following', this.unfollowUser);
    }
}
exports.default = FollowsController;
