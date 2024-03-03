import Stats from "./Stats";

/**
 * @file Implements tuit class that stores all the fields pertaining to
 * a specific tuit.
 */

import User from "./User";

export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    image?: [String],
    youtube?: String,
    avatarLogo?: String,
    imageOverlay?: String,
    stats: Stats
};