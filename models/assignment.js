const mongoose = require("mongoose");
const {Schema} = mogoose;

const assignment = new Schema({
    subject:{type:String, required:true},
    assignment:{type:String, required:true},
    class:{type:String, required:true},
    teacher:{type:String, required:true},
    dateSubmitted:{type:Date, default:Date.now},
    submissionDate:{type:Date, required:true}
});

Assignment = mongoose.model("Assignment", assignment);
module.exports = Assignment;