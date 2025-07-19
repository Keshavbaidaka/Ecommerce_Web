const {Schema,model} = require("mongoose");


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
    trim:true
  },
  email: {
    type: String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  phone:{
    type:String,
    required:true
  },
  address:{
    type:{},
    required:true
  },
  answer: {
      type: String,
      required: true,
    },
  role:{
    type:Number,
    default:0
  }
},{timestamps:true});

const userModel = model("users", userSchema)

module.exports = userModel