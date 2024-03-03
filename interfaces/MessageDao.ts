/**
 * @file Declares API for Bookmarks related data access object methods
 */

import Message from "../models/Message";

export default interface BookmarkDao {
    sendMessage(uidSender: string, uidReceiver: string, message: Message): Promise<any>;
    viewSentMessage(uid: string): Promise<any>;
    viewRecivedMessage(uid: string): Promise<any>;
    deleteMessage(mid: string): Promise<any>;
}