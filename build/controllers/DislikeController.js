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
 * @property {DisLikeDao} disLikeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
class DislikeController {
    constructor() {
        this.userTogglesTuitDisLikes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.userid;
            const tid = req.params.tid;
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ?
                profile._id : uid;
            try {
                const userAlreadyDisLikedTuit = yield DislikeController.disLikeDao
                    .findUserDisLikesTuit(userId, tid);
                const userAlreadyLikedTuit = yield DislikeController.likeDao
                    .findUserLikesTuit(userId, tid);
                const howManyDisLikedTuit = yield DislikeController.disLikeDao
                    .findAllUsersThatDisLikedTuitCount(tid);
                const howManyLikedTuit = yield DislikeController.likeDao
                    .findAllUsersThatLikedTuitCount(tid);
                // console.log(userAlreadyDisLikedTuit)
                // console.log(userAlreadyLikedTuit)
                // console.log(howManyDisLikedTuit)
                // console.log(howManyLikedTuit)
                let tuit = yield DislikeController.tuitDao.findTuitsByID(tid);
                if (tuit != null) {
                    if (userAlreadyDisLikedTuit) {
                        yield DislikeController.disLikeDao.userRemovesDislikeTuit(userId, tid);
                        tuit.stats['dislikes'] = howManyDisLikedTuit - 1;
                    }
                    else {
                        yield DislikeController.disLikeDao.userDisLikesTuit(userId, tid);
                        if (userAlreadyLikedTuit) {
                            yield DislikeController.likeDao.userUnlikesTuit(userId, tid);
                            tuit.stats.likes = howManyLikedTuit - 1;
                        }
                        tuit.stats['dislikes'] = howManyDisLikedTuit + 1;
                    }
                    ;
                    console.log(tuit.stats);
                    yield DislikeController.tuitDao.updateLikes(tid, tuit.stats);
                }
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
    }
    findUserDisLikesTuit(req, res) {
        throw new Error("Method not implemented.");
    }
    findAllUsersThatDisLikedTuit(req, res) {
        throw new Error("Method not implemented.");
    }
    findAllTuitsDisLikedByUser(req, res) {
        throw new Error("Method not implemented.");
    }
    findAllUsersThatDisLikedTuitCount(req, res) {
        throw new Error("Method not implemented.");
    }
    userDisLikesTuit(req, res) {
        throw new Error("Method not implemented.");
    }
    userRemoveDislikeTuit(req, res) {
        throw new Error("Method not implemented.");
    }
}
exports.default = DislikeController;
DislikeController.disLikeDao = new DislikeDao_1.default();
DislikeController.likeDao = new LikeDao_1.default();
DislikeController.tuitDao = new TuitDao_1.default();
DislikeController.disLikeController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return TuitController
 */
DislikeController.getInstance = (app) => {
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
};
