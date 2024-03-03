import { Request, Response } from "express";

export default interface UserController {
    findAllUsers(req: Request, res: Response): void;
    findUserByName(req: Request, res: Response): void; 
    findUserByID(req: Request, res: Response): void;
    createUser(req: Request, res: Response): void;
    deleteUser(req: Request, res: Response): void;
    deleteUserByUserName(req: Request, res: Response): void;
    updateUser(req: Request, res: Response): void;
}