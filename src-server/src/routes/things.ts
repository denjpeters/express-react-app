import express, {Request, Response} from "express";

export const thingsRouter = express
    .Router();

thingsRouter
    .route("/cars")
    .get((req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.json({Get: "Stuff"});
    });

thingsRouter
    .route("/cars")
    .post((req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.json({Post: "Stuff"});
    });
