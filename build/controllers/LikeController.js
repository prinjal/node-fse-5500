"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DislikeDao_1 = __importDefault(require("../daos/DislikeDao"));
const LikeDao_1 = __importDefault(require("../daos/LikeDao"));
const TuitDao_1 = __importDefault(require("../daos/TuitDao"));
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
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
class LikeController {
    constructor() {
        this.findUserLikesTuit = (req, res) => {
            LikeController.likeDao.findUserLikesTuit(req.params.uid, req.params.tid)
                .then(likes => res.json(likes));
        };
        this.findAllUsersThatLikedTuitCount = (req, res) => LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));
        /**
         * Retrieves all users that liked a tuit from the database
         * @param {Request} req Represents request from client, including the path
         * parameter tid representing the liked tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findAllUsersThatLikedTuit = (req, res) => LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));
        /**
         * Retrieves all tuits liked by a user from the database
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user liked the tuits
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects that were liked
         */
        this.findAllTuitsLikedByUser = (req, res) => LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
            .then(likes => res.json(likes));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is liking the tuit
         * and the tuit being liked
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new likes that was inserted in the
         * database
         */
        this.userLikesTuit = (req, res) => LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(likes => res.json(likes));
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is unliking
         * the tuit and the tuit being unliked
         * @param {Response} res Represents response to client, including status
         * on whether deleting the like was successful or not
         */
        this.userUnlikesTuit = (req, res) => LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
        this.userTogglesTuitLikes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.userid;
            const tid = req.params.tid;
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ?
                profile._id : uid;
            try {
                const userAlreadyDisLikedTuit = yield LikeController.disLikeDao
                    .findUserDisLikesTuit(userId, tid);
                const userAlreadyLikedTuit = yield LikeController.likeDao
                    .findUserLikesTuit(userId, tid);
                const howManyDisLikedTuit = yield LikeController.disLikeDao
                    .findAllUsersThatDisLikedTuitCount(tid);
                const howManyLikedTuit = yield LikeController.likeDao
                    .findAllUsersThatLikedTuitCount(tid);
                let tuit = yield LikeController.tuitDao.findTuitsByID(tid);
                // console.log(userAlreadyDisLikedTuit)
                // console.log(userAlreadyLikedTuit)
                // console.log(howManyDisLikedTuit)
                // console.log(howManyLikedTuit)
                if (tuit != null) {
                    if (userAlreadyLikedTuit) {
                        yield LikeController.likeDao.userUnlikesTuit(userId, tid);
                        tuit.stats.likes = howManyLikedTuit - 1;
                    }
                    else {
                        yield LikeController.likeDao.userLikesTuit(userId, tid);
                        if (userAlreadyDisLikedTuit) {
                            yield LikeController.disLikeDao.userRemovesDislikeTuit(userId, tid);
                            tuit.stats.dislikes = howManyDisLikedTuit - 1;
                        }
                        tuit.stats.likes = howManyLikedTuit + 1;
                    }
                    ;
                    yield LikeController.tuitDao.updateLikes(tid, tuit.stats);
                    tuit = yield LikeController.tuitDao.findTuitsByID(tid);
                }
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
    }
}
exports.default = LikeController;
LikeController.likeDao = new LikeDao_1.default();
LikeController.disLikeDao = new DislikeDao_1.default();
LikeController.tuitDao = new TuitDao_1.default();
LikeController.likeController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return TuitController
 */
LikeController.getInstance = (app) => {
    if (LikeController.likeController === null) {
        LikeController.likeController = new LikeController();
        app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
        app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
        app.get("/api/tuits/:tid/likes/count", LikeController.likeController.findAllUsersThatLikedTuitCount);
        app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
        app.delete("/api/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
        app.put("/api/users/:uid/likes/:tid", LikeController.likeController.userTogglesTuitLikes);
    }
    return LikeController.likeController;
};
;
