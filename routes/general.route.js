const router = require("express").Router();
const general = require("../models/general");

router.get("/", async(req, res)=>{
    try{
        await general.find({})
            .then(response=>{
                res.status(200).json(response)
            })
    }catch(error){
        res.status(400).json({
            message: "OOPS! something went wrong"
        })
    }
})

router.post("/create", async(req,res)=>{
    try{
        const {term} = req.body;
        await new general({term,})
            .save()
            .then(response=>{
                res.status(200).json(response)
            })
    }catch(error){
        res.status(400).json({
            message: "OOPS! something went wrong"
        })
    }
})

router.put("/update", async(req,res)=>{
    try{

    }catch(error){
        res.status(400).json({
            message: "OOPS! something went wrong"
        })
    }
})

module.exports = router;