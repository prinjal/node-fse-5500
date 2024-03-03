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
const UserDao_1 = __importDefault(require("../daos/UserDao"));
const bcrypt = require('bcrypt');
const saltRounds = 10;
/**
 * Creates singleton controller instance
 * @param app Express instance to declare the RESTful Web service
 * API
 * @constructor
 */
const AuthenticationController = (app) => {
    const userDao = new UserDao_1.default();
    /**
     * User login with username and password. Return 403 if credential does not match.
     *
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object containing the user object
     */
    const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.body;
        const username = user.username;
        const password = user.password;
        const existingUser = yield userDao
            .findUserByName(username);
        const match = yield bcrypt.compare(password, existingUser.password);
        if (match) {
            existingUser.password = '*****';
            // @ts-ignore
            req.session['profile'] = existingUser;
            res.json(existingUser);
        }
        else {
            res.sendStatus(403);
        }
    });
    /**
     * Register new user with username and password. Return 403 if user exists.
     *
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object containing the user object
     */
    const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = req.body;
        const password = newUser.password;
        const hash = yield bcrypt.hash(password, saltRounds);
        newUser.password = hash;
        const existingUser = yield userDao
            .findUserByName(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        }
        else {
            const insertedUser = yield userDao
                .createUser(newUser);
            insertedUser.password = '';
            // @ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    });
    /**
     * Check user profile to see if user has logged in. Return 403 if user didn't log in.
     *
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object containing the user profile object
     */
    const profile = (req, res) => {
        // @ts-ignore
        // The user interface will use the existence of the profile or the error status to
        // conclude whether someone's logged in or not.
        const profile = req.session['profile'];
        if (profile) {
            // safety issue to remove the password information before returning to client
            profile.password = '';
            res.json(profile);
        }
        else {
            res.sendStatus(403);
        }
    };
    /**
     * Log out user by destroying session.
     *
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, send 200 if succeeded.
     */
    const logout = (req, res) => {
        // @ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    };
    app.post("/api/auth/login", login);
    app.post("/api/auth/signup", register);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
};
exports.default = AuthenticationController;
