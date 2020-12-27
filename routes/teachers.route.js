const router = require("express").Router();
const TeacherModel = require("../models/teachers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateToken = require("../middlewares/validateToken")

router.get("/", async(req, res)=>{
    try{
        const teachers = await TeacherModel.find({})
        if(!teachers){
            res.status(404).json({
                message:"no account found"
            })
        }
        res.status(200).json(teachers)
    }catch(error){
        res.status(404).json(error)
    }
})

router.post("/create", async (req, res)=>{
    try{

        const {username, password} = req.body;
    
        if (password.length <= 5) {
            return res.status(400).json({
                message: "your password should be at least 6 characters long"
            });
        }
    
        const existingTeacher = await TeacherModel.findOne({ username });
        if (existingTeacher) {
            return res.status(400).json({
                message: "A user with this username already exists"
            });
        }
    
        //hashes the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newTeacher = new TeacherModel({
            ...req.body,
            password:hashedPassword
        })

        const savedTeacher = await newTeacher.save();
        res.json(savedTeacher)
    }catch(error){
        console.log(error)
        res.status(400).json(error);
    }
})

router.delete("/delete/:id", async (req, res)=>{
    try{
        await TeacherModel.findByIdAndDelete(req.params.id, (error, doc)=>{
            if(error){
                return res.status(404).json({
                    message:"teacher not found"
                }) 
            }
            return(
                res.status(200).json({
                    message:"account successfully deleted"
                })
            )
        })
    }catch(error){
        res.status(404).json(error)
    }
})

router.post("/login", async (req,res)=>{
    try{
        const {username, password} = req.body;

        if(!username || !password){
            res.status(401).json({
                message:"invalid credentials"
            })
        }

        if(password.length < 5){
            res.status(401).json({
                message:"invalid credentials password must be above five characters"
            })
        }

        const teacher = await TeacherModel.findOne({username})

        if(!teacher){
            res.status(401).json({
                message:"user doesn't exist"
            })
        }

        const passwordMatch = await bcrypt.compare(password, teacher.password);

        if(!passwordMatch){
            res.status(401).json({
                message:"invalid credentials"
            })
        }

        if(teacher.blocked){
            res.status(401).json({
                message:"your account has been blocked"
            })
        }

        //creates a token for the user
        const token = jwt.sign({ 
            id: teacher._id,
            username: teacher.username,
            }, process.env.JWT_TOKEN);
        return res.status(200).json({
            token
        });
    }catch(error){
        console.log(error)
        res.status(401).json(error)
    }
})

router.get("/profile/:token", validateToken, async(req,res)=>{
    try{
         const teacher = await TeacherModel.findById(req.userID);
         res.status(200).json(teacher);
    }catch(error){
        res.status(500).json({
            message:"student not found"
        })
    }
})

module.exports = router;