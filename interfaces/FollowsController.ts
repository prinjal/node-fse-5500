/**
 * @file Declares controller RESTful API for Follows resource
 */

import { Request, Response } from "express";

export default interface FollowsController {
    followUser(req: Request, res: Response): void;
    unfollowUser(req: Request, res: Response): void;
    getFollowers(req: Request, res: Response): void;
    getFollowing(req: Request, res: Response): void;
}