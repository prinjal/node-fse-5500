"use strict";
/**
 * @file Implements follows class that stores all the fields pertaining to
 * a specific follows.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Follows {
    constructor(data) {
        this.userFollowed = 0;
        this.userFollowing = 0;
        this.userFollowed = data.userFollowed;
        this.userFollowing = data.userFollowing;
    }
}
exports.default = Follows;
