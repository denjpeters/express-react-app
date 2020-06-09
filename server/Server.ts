import {Express, Request, Response} from "express";
import express from "express";
import * as path from "path";

export class Server {

    private app: Express;

    constructor(app: Express) {
        this.app = app;

        this.app.use(express.static(path.resolve("./") + "/build/frontend"));

        this.app.get("/api", (req: Request, res: Response): void => {
            // res.sendStatus(202);
            // res.send("You have reached the API!");
            res.setHeader('Content-Type', 'application/json');
            res.json({One: 1, Two: 2, Three: "Tres"});
        });


        this.app.get("*", (req: Request, res: Response): void => {
            res.sendFile(path.resolve("./") + "/build/frontend/index.html");
        });
    }

    public start(port: number): void {
        this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
    }

}

