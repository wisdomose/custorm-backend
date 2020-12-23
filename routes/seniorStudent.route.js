`node --trace-warnings`
const router = require("express").Router();
const StudentModel = require("../models/seniorStudents");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateAdmin = require("../middlewares/validateAdmin")
const validateToken = require("../middlewares/validateToken")


/*

remember to set a route to handle update of password

*/

router.post("/register", async (req, res) => {
    try {
        const { username, password, surname, firstname, lastname, klass, contacts, subjectCombination, midTerm, examination, adminNumber  } = req.body;

        if (!password || !username || !surname || !firstname || !lastname || !klass || !adminNumber) {
            return res.status(400).json({
                msg: "check input credentials"
            });
        }

        if (password.length <= 5) {
            return res.status(400).json({
                msg: "your password should be at least 6 characters long"
            });
        }

        const existingStudent = await StudentModel.findOne({ username });
        if (existingStudent) {
            return res.status(200).json({
                msg: "A user with this username already exists"
            });
        }


        //hashes the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const newStudent = new StudentModel({
            username,
            password: hashedPassword,
            surname,
            firstname,
            lastname,
            class: klass,
            adminNumber,
            dateOfBirth: Date.now(),
            contacts,
            subjectCombination,
            midTerm,
            examination
        });


        const savedStudent = await newStudent.save();
        res.json(savedStudent);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }

})

router.post("/login", async (req, res) => {
    try {
        //unpacks the request body
        const { username, password } = req.body;

        //if no username or password in the req body
        if (!username || !password) {
            res.status(400).json({ msg: "not all fields are entered" });
        }

        //if password is less than 5
        if (password.length < 5) {
            res.status(400).json({ msg: "password must be at least five characters long" });
        }

        //if user exists get user from the DB
        const student = await StudentModel.findOne({ username: username });

        //if user dosent exist this runs
        if (!student) {
            return res.status(400).json({ msg: "no account found" });
        }

        //compares users password with crypted password in DB
        const passwordMatch = await bcrypt.compare(password, student.password);

        //if passwords dont match run
        if (!passwordMatch) {
            return res.status(400).json({ msg: "invalid credentials" });
        }

        // if(!student.paid){
        //     return res.status(400).json({ message: "no permission to login please contact the school authority" });
        // }

        //creates a token for the user
        const token = jwt.sign({ 
            id: student._id,
            username: student.username,
            paid:student.paid
            }, process.env.JWT_TOKEN);
        return res.json({
            token
        });

    } catch (error) {
        return res.status(500).json({ msg: "invalid crredentials" })
    }
})

router.delete("/delete/:id", validateAdmin, async(req,res)=>{
    try{
        // checks if theh student exists
        const student = await StudentModel.findById(req.params.id);

        // prints an error if he dosent exist
        if(!student){
            return res.status(404).json({
                msg:"student not found"
            }) 
        }

        // if he exists, delete the account
        await StudentModel.findByIdAndDelete(req.params.id, (error, doc)=>{
            if(error){
                return res.status(404).json({
                    msg:"student not found"
                }) 
            }
            return(
                res.status(200).json({
                    msg:"account successfully deleted"
                })
            )
        })
    }
    catch (error){
        res.status(200).json(err)
    }
})

router.put("/update", validateAdmin, async(req,res)=>{
    try{

        // get the student with the id
        const student = await StudentModel.findById(req.user.id);

        // return error if student dosent exist
        if(!student){
            return res.status(404).json({
                msg:"authorization failed"
            }) 
        }

        // update the student record
        StudentModel.findByIdAndUpdate(req.user.id, req.body, {useFindAndModify:false}, (error, doc)=>{
            if (error){
                return res.status(404).json({
                    msg:"update failed"
                }) 
            }
            return res.status(200).json({
                msg:"successfully updated record"
            })
        })
    }    
    catch (error){
        res.status(200).json(error)
    }
})

router.get("/", async(req,res)=>{
    try{
        const students = await StudentModel.find({});
        if(!students){
            res.status(404).json({
                msg:"Oops! students not found"
            })
        }

        res.status(200).json(students)
    }
    catch (error){
        res.status(200).json(error)
    }
    
})

router.get("/profile/:token", validateToken, async(req,res)=>{
    try{
         const student = await StudentModel.findById(req.userID);
         res.status(200).json(student);
    }catch(error){
        res.status(500).json({
            message:"student not found"
        })
    }
})

router.get("/validate/:token", validateToken, async(req,res)=>{
    try{
         const student = await StudentModel.findById(req.userID);
         res.status(200).json({
             message:"valid token"
         });
    }catch(error){
        res.status(500).json({
            message:"invalid token"
        })
    }
})

module.exports = router;