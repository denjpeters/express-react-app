import express from "express";

export const thingsRouter = express
    .Router();

thingsRouter
    .route("/things/cars")
    .get((req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.json({Get: "Stuff"});
    })
    .post((req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.json({Post: "Stuff"});
    });
