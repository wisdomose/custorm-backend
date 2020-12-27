const mongoose = require("mongoose");
const {Schema} = mongoose;

const notification = new Schema({
    notification:[]
})

module.exports = mongoose.model("notification", notification);