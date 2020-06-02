const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization;
        jwt.verify(token, "learning authentication with angular");
        next();
    } catch(err) {
        res.status(401).json({message : 'No token provided' +req});

    }   

};
