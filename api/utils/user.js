const jwt = require('jsonwebtoken');

const user = {};

user.extract = function(req){
    let decoded         = null;
    let clientId        = null;
    let token           = req.headers['x-access-token'] || req.headers['authorization'];
    let isTokenValid    = false;

    if(token){
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        decoded = jwt.decode(token);

        return decoded;
    }
    else{
        throw new Error('no token provided.');
    }
}

module.exports = user;