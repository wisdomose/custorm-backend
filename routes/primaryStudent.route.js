`node --trace-warnings`
const router = require("express").Router();
const StudentModel = require("../models/primaryStudents");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateAdmin = require("../middlewares/validateAdmin")
const validateToken = require("../middlewares/validateToken")


/*


remember to set a route to handle update of password

*/

router.post("/register", async (req, res) => {
    try {
        const { username, password} = req.body;

        if (password.length <= 5) {
            return res.status(400).json({
                message: "your password should be at least 6 characters long"
            });
        }

        const existingStudent = await StudentModel.findOne({ username });
        if (existingStudent) {
            return res.status(200).json({
                message: "A user with this username already exists"
            });
        }


        //hashes the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const newStudent = new StudentModel({
            ...req.body,
            password: hashedPassword,
            dateOfBirth: Date.now(),
        });


        const savedStudent = await newStudent.save();
        res.json(savedStudent);
    }
    catch (error) {
        console.log(error)
        res.status(404).json(error);
    }

})

router.post("/login", async (req, res) => {
    try {
        //unpacks the request body
        const { username, password } = req.body;

        //if no username or password in the req body
        if (!username || !password) {
            res.status(400).json({ message: "not all fields are entered" });
        }

        //if password is less than 5
        if (password.length < 5) {
            res.status(400).json({ message: "password must be at least five characters long" });
        }

        //if user exists get user from the DB
        const student = await StudentModel.findOne({ username: username });

        //if user dosent exist this runs
        if (!student) {
            return res.status(400).json({ message: "no account found" });
        }

        //compares users password with crypted password in DB
        const passwordMatch = await bcrypt.compare(password, student.password);

        //if passwords dont match run
        if (!passwordMatch) {
            return res.status(400).json({ message: "invalid credentials" });
        }

        if(!student.paid){
            return res.status(400).json({ message: "no permission to login please contact the school authority" });
        }

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
        return res.status(500).json({ message: "invalid crredentials" })
    }
})

router.delete("/delete/:id", validateAdmin, async(req,res)=>{
    try{

        await StudentModel.findByIdAndDelete(req.params.id, (error, doc)=>{
            if(error){
                return res.status(404).json({
                    message:"student not found"
                }) 
            }
            return(
                res.status(200).json({
                    message:"account successfully deleted"
                })
            )
        })
    }
    catch (error){
        res.status(200).json(err)
    }
})

router.put("/update", validateAdmin, async(req,res)=>{
    try {
        const {type, id} = req.query.account;
        const result = req.body.result;
        const student = await StudentModel.findById(id);

        switch(type){
            case "midterm":
                student.midTerm.results = result;
                break;
            case "examination":
                student.examination.results = result;
                break
            default:
                res.status(400).json({
                    message:"bad request"
                })
                break;
            }

        await student.save()
            .then(doc=>res.json(doc))
        }
     catch (error) {
        res.status(404).json(error)
    }
})

router.get("/", async(req,res)=>{
    try{
        const students = await StudentModel.find({});
        if(!students){
            res.status(404).json({
                message:"Oops! students not found"
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