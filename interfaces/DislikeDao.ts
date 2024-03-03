import DisLikeModel from "../mongoose/DislikeModel";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface LikeDaoI {
    findUserDisLikesTuit(uid: string, tid: string): Promise<any>;
    findAllUsersThatDisLikedTuitCount(tid: string): Promise<any>;
    userDisLikesTuit(uid: string, tid: string): Promise<any>;
    userRemovesDislikeTuit(uid: string, tid: string): Promise<any>;
};