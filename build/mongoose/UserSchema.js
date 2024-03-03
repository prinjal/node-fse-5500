"use strict";
/**
 * @file Implements mongoose schema for users
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AccountType_1 = __importDefault(require("../models/AccountType"));
const MaritalStatus_1 = __importDefault(require("../models/MaritalStatus"));
/**
 * @typedef User Represents the tuit user
 * @property {string} username The user's username, required field
 * @property {string} username The user's password, required field
 * @property {string} firstName The user's firstname
 * @property {string} lastName The user's lasrname
 * @property {string} email The user's email, required field
 * @property {string} profilePhoto The user's profile photo
 * @property {string} headerImage The user's header image
 * @property {string} accountType The user's account type, default is personal
 * @property {string} maritalStatus The user's marital status, default is single
 * @property {string} biography The user's biography
 * @property {date} dateOfBirth The user's birthday
 * @property {date} joined The user's join date, default to current time
 * @property {number[]} location Latitude and Longitude of the location
 */
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: { type: String, default: 'PERSONAL', enum: AccountType_1.default },
    maritalStatus: { type: String, default: MaritalStatus_1.default.Single, enum: MaritalStatus_1.default },
    biography: String,
    dateOfBirth: Date,
    joined: { type: Date, default: Date.now },
    location: {
        latitude: { type: Number, default: 0.0 },
        longitude: { type: Number, default: 0.0 }
    }
}, { collection: 'users' });
exports.default = UserSchema;
