export const testMW = (req, res, next) => {
    console.log('here');

    res.setHeader("intelliwake", JSON.stringify({field2: "append2"}));

    next();
}
