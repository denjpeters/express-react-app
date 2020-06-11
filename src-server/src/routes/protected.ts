import express, { Request, Response } from "express";
import {query} from "../database/mysqlConnection";

export const protectedRouter = express
    .Router();

protectedRouter
    .route("/cars")
    .post((req: Request, res: Response) => {
        query('SELECT * FROM NCCIBody where ID <= :bodyID AND IsActive = :isActive', {bodyID: 10, isActive: 1})
            .then((data: any) => { // {rows}
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
