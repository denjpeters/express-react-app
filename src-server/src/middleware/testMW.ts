import { Request, Response } from "express";

export const testMW = (req: Request, res: Response, next: () => void) => {
    const authorization = JSON.parse(req.headers.authorization ?? "{}");

    if (!!authorization.device_token) {
        res.setHeader("intelliwake", JSON.stringify({token: authorization.device_token ?? "nf"}));

        next();
    } else {
        res.sendStatus(401);
    }
}

export const test2MW = () => {
    console.log(2);
}
