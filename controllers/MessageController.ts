import { Request, Response, Express } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageController";

export default class MessageController implements MessageControllerI {
    app: Express;
    messageDao: MessageDao;
    constructor(app: Express, messageDao: MessageDao) {
        this.app = app;
        this.messageDao = messageDao;
        this.app.post('/users/:uidSender/message/:uidReceiver', this.sendMessage);
        this.app.get('/users/:uid/message/sent', this.viewSentMessages);
        this.app.get('/users/:uid/message/received', this.viewReceivedMessages);
        this.app.delete('/users/message/:mid', this.deleteMessage);
    }


    sendMessage = (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
        this.messageDao.sendMessage(req.params.uidSender, req.params.uidReceiver, req.body)
            .then(message => res.json(message));

    }
    viewSentMessages = (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
        this.messageDao.viewSentMessage(req.params.uid)
            .then(message => res.json(message));
    }
    viewReceivedMessages = (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
        this.messageDao.viewRecivedMessage(req.params.uid)
            .then(message => res.json(message));
    }
    deleteMessage = (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
        this.messageDao.deleteMessage(req.params.mid)
            .then(message => res.json(message));
    }

}