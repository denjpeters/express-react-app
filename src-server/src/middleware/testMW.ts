export const testMW = (req, res, next) => {
    const authorization = JSON.parse(req.headers.authorization ?? {});

    res.setHeader("intelliwake", JSON.stringify({token: authorization.device_token ?? "nf"}));

    next();
}
