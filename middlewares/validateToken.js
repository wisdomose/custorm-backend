const jwt = require("jsonwebtoken");
const validateToken = (req, res, next)=>{
    try{
        const bearer = req.params.token;
        if(!bearer){
            return res.status(401).json({
                msg:"authorization denied"
            })
        }

        const verified = jwt.verify(bearer, process.env.JWT_TOKEN)

        if(!verified){
            return res.status(401).json({
                msg:"authorization denied"
            })
        }

        req.userID=verified.id;

        next();
    }
    catch(error){
        res.status(400).json(error)
    }
}

module.exports = validateToken;