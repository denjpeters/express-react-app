import express, {Request, Response} from "express";

export const othersRouter = express
    .Router();

othersRouter
    .route("/cars")
    .get((req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.json({Get: "Stuff3"});
    });

othersRouter
    .route("/cars")
    .post((req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.json({Post: "Stuff"});
    });
