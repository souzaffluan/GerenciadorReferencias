const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    nome:{
        type:String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    senha:{
        type:String,
        require: true
    }
}
);

const User = mongoose.model("User", userSchema);

module.exports = User;