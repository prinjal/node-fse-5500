"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageController {
    constructor(app, messageDao) {
        this.sendMessage = (req, res) => {
            this.messageDao.sendMessage(req.params.uidSender, req.params.uidReceiver, req.body)
                .then(message => res.json(message));
        };
        this.viewSentMessages = (req, res) => {
            this.messageDao.viewSentMessage(req.params.uid)
                .then(message => res.json(message));
        };
        this.viewReceivedMessages = (req, res) => {
            this.messageDao.viewRecivedMessage(req.params.uid)
                .then(message => res.json(message));
        };
        this.deleteMessage = (req, res) => {
            this.messageDao.deleteMessage(req.params.mid)
                .then(message => res.json(message));
        };
        this.app = app;
        this.messageDao = messageDao;
        this.app.post('/users/:uidSender/message/:uidReceiver', this.sendMessage);
        this.app.get('/users/:uid/message/sent', this.viewSentMessages);
        this.app.get('/users/:uid/message/received', this.viewReceivedMessages);
        this.app.delete('/users/message/:mid', this.deleteMessage);
    }
}
exports.default = MessageController;
