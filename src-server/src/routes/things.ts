import express from "express";

export const thingsRouter = express
    .Router();

thingsRouter
    .route("/cars")
    .get((req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.json({Get: "Stuff"});
    });

thingsRouter
    .route("/cars")
    .post((req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.json({Post: "Stuff"});
    });
