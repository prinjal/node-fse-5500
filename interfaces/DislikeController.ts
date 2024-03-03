import { Request, Response } from "express";

export default interface LikeControllerI {
    findAllUsersThatDisLikedTuit(req: Request, res: Response): void;
    findUserDisLikesTuit(req: Request, res: Response): void;
    findAllTuitsDisLikedByUser(req: Request, res: Response): void;
    findAllUsersThatDisLikedTuitCount(req: Request, res: Response): void;
    userDisLikesTuit(req: Request, res: Response): void;
    userRemoveDislikeTuit(req: Request, res: Response): void;
};