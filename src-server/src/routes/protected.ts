import express from "express";
import mysql from "mysql";
import util from "util";

export const protectedRouter = express
    .Router();

protectedRouter
    .route("/cars")
    .get((req, res) => {
        const pool = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            port: 3311,
            user: 'admin',
            password: '123',
            database: 'transcom-app-local'
        });

        pool.query = util.promisify(pool.query);

        pool.query('SELECT * FROM NCCIBodyZ', (err, rows, fields) => {
            if (err) {

                res.sendStatus(401);
                // throw err;
            }

            res.setHeader('Content-Type', 'application/json');
            res.json({rows: rows, fields: fields});
        })

        // res.json({Get: "Protected Get Stuff"});
    });

protectedRouter
    .route("/cars")
    .post((req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.json({Post: "Protected Post Stuff"});
    });
