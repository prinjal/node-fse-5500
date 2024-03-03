/**
 * @file Declares controller RESTful API for Messages resource
 */

import { Request, Response } from "express";

export default interface MessageController {
    sendMessage(req: Request, res: Response): void;
    viewSentMessages(req: Request, res: Response): void;
    viewReceivedMessages(req: Request, res: Response): void;
    deleteMessage(req: Request, res: Response): void;
}