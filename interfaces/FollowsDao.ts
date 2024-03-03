/**
 * @file Declares API for Follows related data access object methods
 */

import Follows from "../models/Follow";
import User from "../models/User";

export default interface FollowsDao {
    followUser(followedBy: string, following: string): Promise<any>;
    unfollowUser(followedBy: string, following: string): Promise<any>;
    getFollowers(uid: string): Promise<any>;
    getFollowing(uid: string): Promise<any>;
};