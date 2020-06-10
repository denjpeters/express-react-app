import express, {Request, Response} from "express";
import * as path from "path";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import {thingsRouter} from "./src/routes/things";
import {testFunction} from "../src-common/src/functionality";

const app = express();

const port = 8080;

app.use(express.static(path.resolve("./") + "/build/src-app"));
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());

app.use("/api", thingsRouter);

app.post("/api", (req: Request, res: Response): void => {
    testFunction();

    res.setHeader('Content-Type', 'application/json');
    res.json({One: req.body.single, Two: 2, Three: "Tres"});
});

app.get("*", (req: Request, res: Response): void => {
    res.sendFile(path.resolve("./") + "/build/src-app/index.html");
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
