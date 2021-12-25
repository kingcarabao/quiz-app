const jwt   = require('jsonwebtoken');

const JWT = {
    generateToken: function(payload){
        return new Promise(
            resolve => {
                resolve(jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_LIFE}));
            }
        )
    },
    
    verifyToken: function(token){
        let result = {
            isValid: false,
            decoded: null,
            error: null
        };

        if (token) {
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }
            jwt.verify(token, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_LIFE}, async (err, decoded) => {
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
    }

}

module.exports = JWT;