/**
 * @file Controller RESTful Web service API for likes resource
 */
import { Express, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import DislikeDao from "../daos/DislikeDao";
import LikeDao from "../daos/LikeDao";
import TuitDao from "../daos/TuitDao";
import DislikeControllerI from "../interfaces/DislikeController";
import LikeController from "./LikeController";

/**
 * @class TuitController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no londer likes a tuit</li>
 * </ul>
 * @property {DisLikeDao} disLikeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class DislikeController implements DislikeControllerI {
    private static disLikeDao: DislikeDao = new DislikeDao();
    private static likeDao: LikeDao = new LikeDao();
    private static tuitDao: TuitDao = new TuitDao();
    private static disLikeController: DislikeController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): DislikeController => {
        if (DislikeController.disLikeController === null) {
            DislikeController.disLikeController = new DislikeController();
            app.get("/api/users/:uid/dislikes", DislikeController.disLikeController.findAllTuitsDisLikedByUser);
            app.get("/api/tuits/:tid/dislikes", DislikeController.disLikeController.findAllTuitsDisLikedByUser);
            app.get("/api/tuits/:tid/dislikes/count", DislikeController.disLikeController.findAllUsersThatDisLikedTuitCount);
            app.post("/api/users/:uid/dislikes/:tid", DislikeController.disLikeController.userDisLikesTuit);
            app.delete("/api/users/:uid/removedislikes/:tid", DislikeController.disLikeController.userRemoveDislikeTuit);
            app.put("/api/users/:uid/dislikes/:tid", DislikeController.disLikeController.userTogglesTuitDisLikes);
        }
        return DislikeController.disLikeController;
    }


    private constructor() { }
    findUserDisLikesTuit(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        throw new Error("Method not implemented.");
    }
    findAllUsersThatDisLikedTuit(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        throw new Error("Method not implemented.");
    }
    findAllTuitsDisLikedByUser(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        throw new Error("Method not implemented.");
    }
    findAllUsersThatDisLikedTuitCount(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        throw new Error("Method not implemented.");
    }
    userDisLikesTuit(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        throw new Error("Method not implemented.");
    }
    userRemoveDislikeTuit(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        throw new Error("Method not implemented.");
    }

    userTogglesTuitDisLikes = async (req: any, res: any) => {
        const uid = req.params.userid;
        const tid = req.params.tid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const userAlreadyDisLikedTuit = await DislikeController.disLikeDao
                .findUserDisLikesTuit(userId, tid);
            const userAlreadyLikedTuit = await DislikeController.likeDao
                .findUserLikesTuit(userId, tid);
            const howManyDisLikedTuit = await DislikeController.disLikeDao
                .findAllUsersThatDisLikedTuitCount(tid);
            const howManyLikedTuit = await DislikeController.likeDao
                .findAllUsersThatLikedTuitCount(tid);

            // console.log(userAlreadyDisLikedTuit)
            // console.log(userAlreadyLikedTuit)
            // console.log(howManyDisLikedTuit)
            // console.log(howManyLikedTuit)

            let tuit = await DislikeController.tuitDao.findTuitsByID(tid);

            if (tuit != null) {
                if (userAlreadyDisLikedTuit) {
                    await DislikeController.disLikeDao.userRemovesDislikeTuit(userId, tid);
                    tuit.stats['dislikes'] = howManyDisLikedTuit - 1;
                } else {
                    await DislikeController.disLikeDao.userDisLikesTuit(userId, tid);
                    if (userAlreadyLikedTuit) {
                        await DislikeController.likeDao.userUnlikesTuit(userId, tid);
                        tuit.stats.likes = howManyLikedTuit - 1;
                    }

                    tuit.stats['dislikes'] = howManyDisLikedTuit + 1;

                };
                console.log(tuit.stats);
                await DislikeController.tuitDao.updateLikes(tid, tuit.stats);
            }

            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }


}