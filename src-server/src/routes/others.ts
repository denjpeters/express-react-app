import express from "express";

export const othersRouter = express
    .Router();

othersRouter
    .route("/cars")
    .get((req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.json({Get: "Stuff3"});
    });

othersRouter
    .route("/cars")
    .post((req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.json({Post: "Stuff"});
    });
