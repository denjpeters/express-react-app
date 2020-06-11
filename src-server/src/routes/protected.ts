import express from "express";
import {databasePool} from "../database/mysqlConnection";

export const protectedRouter = express
    .Router();

protectedRouter
    .route("/cars")
    .post((req, res) => {
        databasePool.query('SELECT * FROM NCCIBody where ID <= ?', [10])
            .then(data => {
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            })
            .catch(err => {
                res.json([]);
            });
    });

protectedRouter
    .route("/cars")
    .post((req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.json({Post: "Protected Get Stuff"});
    });
