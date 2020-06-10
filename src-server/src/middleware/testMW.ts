export const testMW = (req, res, next) => {
    const authorization = JSON.parse(req.headers.authorization ?? "{}");

    if (!!authorization.device_token) {
        res.setHeader("intelliwake", JSON.stringify({token: authorization.device_token ?? "nf"}));

        next();
    } else {
        res.sendStatus(401);
    }
}
