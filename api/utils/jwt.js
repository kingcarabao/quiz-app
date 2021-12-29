const jwt   = require('jsonwebtoken');

const jwtUtil = {};

jwtUtil.generateToken = (payload) => {
    return new Promise(
        resolve => {
            resolve(jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_LIFE }));
        }
    )
};

jwtUtil.verifyToken = (token) => {
    let result = {
        isValid: false,
        decoded: null,
        error: null
    };

    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        jwt.verify(token, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_LIFE }, async (err, decoded) => {
            if (err) {
                result.error = err;
            }
            else{
                result.isValid = true;
                result.decoded = decoded;
            }
        });
    }
    return result;
};

module.exports = jwtUtil;