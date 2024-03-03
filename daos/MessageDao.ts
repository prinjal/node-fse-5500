import MessageDaoI from "../interfaces/MessageDao";
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";

export default class MessageDao implements MessageDaoI {
    async sendMessage(uidSender: string, uidReceiver: string, message: Message): Promise<any> {
        return await MessageModel.create({ ...message, to: uidReceiver, from: uidSender });
    }
    async viewSentMessage(uid: string): Promise<any> {
        return await MessageModel.find({ from: uid });
    }
    async viewRecivedMessage(uid: string): Promise<any> {
        return await MessageModel.find({ to: uid });
    }
    async deleteMessage(mid: string): Promise<any> {
        return await MessageModel.deleteOne({ _id: mid });
    }

}