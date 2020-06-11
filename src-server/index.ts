import express, {Request, Response} from "express";
import * as path from "path";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import {thingsRouter} from "./src/routes/things";
import {othersRouter} from "./src/routes/others";
import {protectedRouter} from "./src/routes/protected";
import {testMW} from "./src/middleware/testMW";
import {testFunction} from "../src-common/src/functionality";

const app = express();

const port = 8080;

const apiPrefix = "/api"

testFunction();

app.use(express.static(path.resolve("./") + "/build/src-app"));
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());

app.use(`${apiPrefix}/things`, thingsRouter);
app.use(`${apiPrefix}/others`, othersRouter);

app.use(`${apiPrefix}`, testMW);

app.use(`${apiPrefix}/protected`, protectedRouter);

app.get("*", (req: Request, res: Response): void => {
    res.sendFile(path.resolve("./") + "/build/src-app/index.html");
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
