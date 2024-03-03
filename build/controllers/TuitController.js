"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TuitController {
    constructor(app, tuitDao) {
        this.findAllTuits = (req, res) => {
            this.tuitDao.findAllTuits()
                .then(tuits => res.json(tuits));
        };
        this.findTuitById = (req, res) => {
            this.tuitDao.findTuitsByID(req.params.tuitid).then(tuit => res.json(tuit));
        };
        this.findTuitsByUser = (req, res) => {
            let userId = req.params.userid === "me"
                && req.session['profile'] ?
                req.session['profile']._id :
                req.params.uid;
            this.tuitDao.findTuitsByUser(userId).then(tuits => res.json(tuits));
        };
        this.createTuit = (req, res) => {
            let userId = req.params.userid === "me"
                && req.session['profile'] ?
                req.session['profile']._id :
                req.params.uid;
            //console.log(req);
            this.tuitDao.createTuit(req.body, userId).then(tuit => res.json(tuit));
        };
        this.updateTuit = (req, res) => {
            this.tuitDao.updateTuit(req.params.tuitid, req.body).then(tuit => res.json(tuit));
        };
        this.deleteTuit = (req, res) => {
            this.tuitDao.deleteTuit(req.params.tuitid).then(tuit => res.json(tuit));
        };
        this.app = app;
        this.tuitDao = tuitDao;
        this.app.get('/api/tuits', this.findAllTuits);
        this.app.get('/api/tuits/:tuitid', this.findTuitById);
        this.app.get('/api/users/:userid/tuits', this.findTuitsByUser);
        this.app.post('/api/users/:userid/tuits', this.createTuit);
        this.app.put('/api/tuits/:tuitid ', this.updateTuit);
        this.app.delete('/api/tuits/:tuitid', this.deleteTuit);
    }
}
exports.default = TuitController;
