const jwt = require("jsonwebtoken");
const validateAdmin = (req, res, next)=>{
    try{
        const bearer = req.header("x-auth-token");
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

        req.user=verified;

        next();
    }
    catch(error){
        res.status(200).json(error)
    }
}

module.exports = validateAdmin;