import { Request, Response, Express } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

export default class TuitController implements TuitControllerI {
    app: Express;
    tuitDao: TuitDao;
    constructor(app: Express, tuitDao: TuitDao) {
        this.app = app;
        this.tuitDao = tuitDao;
        this.app.get('/api/tuits', this.findAllTuits);
        this.app.get('/api/tuits/:tuitid', this.findTuitById);
        this.app.get('/api/users/:userid/tuits', this.findTuitsByUser);
        this.app.post('/api/users/:userid/tuits', this.createTuit);
        this.app.put('/api/tuits/:tuitid ', this.updateTuit);
        this.app.delete('/api/tuits/:tuitid', this.deleteTuit);
    }
    findAllTuits = (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
        this.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));
    }
    findTuitById = (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
        this.tuitDao.findTuitsByID(req.params.tuitid).then(tuit => res.json(tuit));
    }
    findTuitsByUser = (req: any, res: Response<any, Record<string, any>>) => {
        let userId = req.params.userid === "me"
            && req.session['profile'] ?
            req.session['profile']._id :
            req.params.uid;
        this.tuitDao.findTuitsByUser(userId).then(tuits => res.json(tuits));
    }
    createTuit = (req: any, res: Response<any, Record<string, any>>) => {
        let userId = req.params.userid === "me"
            && req.session['profile'] ?
            req.session['profile']._id :
            req.params.uid;
        //console.log(req);
        this.tuitDao.createTuit(req.body, userId).then(tuit => res.json(tuit));
    }
    updateTuit = (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
        this.tuitDao.updateTuit(req.params.tuitid, req.body).then(tuit => res.json(tuit));
    }
    deleteTuit = (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
        this.tuitDao.deleteTuit(req.params.tuitid).then(tuit => res.json(tuit));
    }
}