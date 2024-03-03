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
const MessageModel_1 = __importDefault(require("../mongoose/MessageModel"));
class MessageDao {
    sendMessage(uidSender, uidReceiver, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield MessageModel_1.default.create(Object.assign(Object.assign({}, message), { to: uidReceiver, from: uidSender }));
        });
    }
    viewSentMessage(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield MessageModel_1.default.find({ from: uid });
        });
    }
    viewRecivedMessage(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield MessageModel_1.default.find({ to: uid });
        });
    }
    deleteMessage(mid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield MessageModel_1.default.deleteOne({ _id: mid });
        });
    }
}
exports.default = MessageDao;
