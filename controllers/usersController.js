const { User } = require('../models');
const { utilCreate } = require('../helpers/utilService');
const globalErr = require('../helpers/globalError');
const jwt = require('jsonwebtoken');

const userMethods = {
    async signup(req, res) {
        try {
            const { email, password, } = req.body;
            await utilCreate(req, res, User, {
                email,
                password,
            });
        } catch (error) {
            //console.error(error);
            res.status(500).json(globalErr);
        }
    },
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const response = await User.checkCredentials(email, password);
            if (('error') in response) {
                return res.status(401).json({
                    error: response.error
                });
            } else {
                const token = await User.generateToken(req.body.email);
                const decoded = jwt.verify(token, process.env.SECRET);
                return res.status(200).json({
                    'reset_password': 0,
                    'accessToken': token,
                    'expires_in': decoded.exp
                });
            }
        } catch (error) {
            //console.error(error);
            res.status(500).json({
                globalErr,
            });
        }
    }
};
module.exports = userMethods;
