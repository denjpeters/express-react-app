import express, { Request, Response } from "express";
import {query} from "../database/mysqlConnection";

export const protectedRouter = express
    .Router();

protectedRouter
    .route("/cars")
    .post((req: Request, res: Response) => {
        query('SELECT * FROM NCCIBody where ID <= ?', [10])
            .then((data: any) => {
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            })
            .catch(() => {
                res.json([]);
            });
    });

protectedRouter
    .route("/cars")
    .post((req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.json({Post: "Protected Get Stuff"});
    });
