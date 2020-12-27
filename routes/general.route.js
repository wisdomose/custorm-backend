const router = require("express").Router();
const General = require("../models/general");

router.get("/", async(req, res)=>{
    try{
        await General.find({})
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
        await new General({...req.body,})
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
        const {term, subjects} = req.body
        const tempGeneral = await General.find({});
        const general = tempGeneral[0];

        
        if(term){
            general.term = term;
        }
        if(subjects){
            for(key in subjects){
                general.subjects[key] = subjects[key]
            }
        }   

        
        await general
            .save()
            .then(response=>{
                res.status(200).json(response)
            })
    }catch(error){
        console.log(error)
        res.status(400).json({
            message: "OOPS! something went wrong"
        })
    }
})

module.exports = router;