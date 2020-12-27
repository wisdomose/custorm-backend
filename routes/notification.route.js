const router = require("express").Router();
const NotificationModel = require("../models/notification");

router.post("/create", async(req, res)=>{
    try{
        let notification = await NotificationModel.find({});
        if(notification){
            notification = notification[0];
        }
        if(!notification){
            notification = new NotificationModel()
        }

        notification.notification.push({...req.body});

        await notification
            .save()
            .then(response=>{
                res.status(200).json(response)
            })
        }catch(error){
        res.status(400).json(error)
    }
})

router.get("/", async(req,res)=>{
    try{
        await NotificationModel.find({})
            .then(response=>res.status(200).json(response))
    }catch(error){
        res.status(400).json(error)
    }
})

module.exports = router;