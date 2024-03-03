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
const DislikeModel_1 = __importDefault(require("../mongoose/DislikeModel"));
class DislikeDao {
    constructor() {
        this.findUserDisLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () {
            return yield DislikeModel_1.default.findOne({ tuit: tid, likedBy: uid });
        });
        this.findAllUsersThatDisLikedTuitCount = (tid) => __awaiter(this, void 0, void 0, function* () {
            return yield DislikeModel_1.default.count({ tuit: tid });
        });
        this.userDisLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () {
            return yield DislikeModel_1.default.create({ tuit: tid, disLikedBy: uid });
        });
        this.userRemovesDislikeTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () {
            return yield DislikeModel_1.default.deleteOne({ tuit: tid, disLikedBy: uid });
        });
    }
}
exports.default = DislikeDao;
