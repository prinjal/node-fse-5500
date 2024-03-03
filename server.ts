import express, { Request, Response } from 'express';
import UserController from './controllers/UserController';
import UserDao from './daos/UserDao';
import mongoose from "mongoose";
import User from './models/User';
import TuitController from './controllers/TuitController';
import TuitDao from './daos/TuitDao';
import FollowsController from './controllers/FollowsController';
import FollowsDao from './daos/FollowsDao';
import BookmarkController from './controllers/BookmarkController';
import BookmarkDao from './daos/BookmarkDao';
import MessageController from './controllers/MessageController';
import MessageDao from './daos/MessageDao';
import LikeController from './controllers/LikeController';
import LikeDao from './daos/LikeDao';
import AuthenticationController from './controllers/auth-controller';
import DislikeController from './controllers/DislikeController';

const cors = require('cors')
var app = express();
const session = require("express-session");
let sess = {

    secret: "test",

    saveUninitialized: true,

    resave: true,

    cookie: {

        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',

        secure: process.env.NODE_ENV === "production",

    }

}



if (process.env.ENV === 'PRODUCTION') {

    app.set('trust proxy', 1) // trust first proxy

    sess.cookie.secure = true // serve secure cookies

}



app.use(cors({

    credentials: true,

    origin: 'http://localhost:3000'

}));

app.use(session(sess))

app.use(express.json());




const user = process.env.USERNAME || 'prinjaldave';
const userPassword = process.env.USERPASSWORD || 'pm07111996';



mongoose.connect(`mongodb+srv://${user}:${userPassword}@cluster0.vvupba6.mongodb.net/tuiter?retryWrites=true&w=majority`)

//userDao.createUser(new User("alice", "alice123", "Alice", "Wonderland", "alice@wonderland.com"));
const bookmarkController = new BookmarkController(app, new BookmarkDao());
const userController = new UserController(app, new UserDao());
const tuitController = new TuitController(app, new TuitDao());
const followController = new FollowsController(app, new FollowsDao());
const messageController = new MessageController(app, new MessageDao());
const likeController = LikeController.getInstance(app);
const disLikeController = DislikeController.getInstance(app);
AuthenticationController(app);

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!!!!'));

app.get('/hello', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!'));

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = process.env.PORT || 8080;
console.log(PORT);
app.listen(PORT);
