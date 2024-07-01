const CorsMiddleware = (req, res, next) => {
    const allowedOrigins = [process.env.ACCESSIP];
    const origin = req.header('Origin');

    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    } else {
        return res.status(403).send('Forbidden');
    }

    next();
};

module.exports = CorsMiddleware;