import express from "express";
import mysql from "mysql";

export const protectedRouter = express
    .Router();

protectedRouter
    .route("/cars")
    .get((req, res) => {
        res.setHeader('Content-Type', 'application/json');

        const connection = mysql.createConnection({
            host: 'localhost',
            port: 3311,
            user: 'admin',
            password: '123',
            database: 'transcom-app-local'
        });

        connection.connect();

        connection.query('SELECT * FROM NCCIBody', (err, rows, fields) => {
            if (err) throw err;

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
