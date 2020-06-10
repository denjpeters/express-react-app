import {Express, Request, Response} from "express";
import express from "express";
import * as path from "path";
import bodyParser from "body-parser";
import {testFunction} from "src-common/src/functionality";

export class Server {
    private app: Express;

    constructor(app: Express) {
        this.app = app;

        this.app.use(express.static(path.resolve("./") + "/build/app"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        this.app.post("/api", (req: Request, res: Response): void => {
            // res.sendStatus(202);
            // res.send("You have reached the API!");
            // console.log(req.body);
            testFunction();

            res.setHeader('Content-Type', 'application/json');
            res.json({One: req.body.single, Two: 2, Three: "Tres"});
        });

        this.app.get("*", (req: Request, res: Response): void => {
            res.sendFile(path.resolve("./") + "/build/app/index.html");
        });
    }

    public start(port: number): void {
        this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
    }
}

