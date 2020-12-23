const mongoose = require("mongoose");
const {Schema} = mongoose;

const general = new Schema({
    term:{type:String, required:true}
})

const generalStats = mongoose.model("statistic", general);
module.exports = generalStats;