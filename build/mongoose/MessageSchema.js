"use strict";
/**
 * @file Implements mongoose schema for messages
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * @typedef Message Represents the message object user sent
 * @property {string} message The content of the message
 * @property {ObjectId} to The user that received the message
 * @property {ObjectId} from The user that sent the message
 * @property {date} sentOn The date the message is sent
 */
const MessageSchema = new mongoose_1.default.Schema({
    message: { type: String },
    to: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserModel', require: true },
    from: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'UserModel', require: true },
    sentOn: Date
});
exports.default = MessageSchema;
