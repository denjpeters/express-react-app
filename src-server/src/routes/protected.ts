import express from "express";

export const protectedRouter = express
    .Router();

protectedRouter
    .route("/cars")
    .get((req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.json({Get: "Protected Get Stuff"});
    });

protectedRouter
    .route("/cars")
    .post((req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.json({Post: "Protected Post Stuff"});
    });
