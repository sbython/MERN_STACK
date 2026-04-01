require("dotenv").config()
const jwt = require("jsonwebtoken")
const privt_key  = process.env.privt_key

function verify_token  (req, res, next)  {
    const token = req.headers.authorization?.split(" ")[1];
    try 
    {
        req.userId = jwt.verify(token, privt_key);
        next()
    }
    catch (err)
    {
        res.status(401).send({err : err})
    }
}

module.exports = {verify_token}