const jwt = require('jsonwebtoken');
const Auth = {
    async verifyToken(req, res, next) {
        const authHeader = req.headers.authorization;
        let token;
        try{
        if (authHeader) {
            token = authHeader.split(' ')[1];
        } else {
            return res.status(401).json({
                error: 'Unauthorised'
            });
        }
            const decoded = await jwt.verify(token, process.env.SECRET);
            if (!decoded) {
                return res.status(401).json({
                    error: 'Unauthorised'
                });
            }
            next();
        } catch (error) {    
            console.error(error.message);
            if (error.message === 'jwt expired') {
                return res.status(401).json({
                    error: 'token expired, kindly login again'
                });
            }
            return res.status(400).json({
                error: 'An error has occured'
            });
        }
    }
};

module.exports = Auth;
