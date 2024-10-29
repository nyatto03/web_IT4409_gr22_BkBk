import mongoose from "mongoose";
const { Schema } = mongoose;

const userschema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    photos:{
        type: [String],
    },
    desc:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        min: 0,
        max: 5
    },
    rooms:{
        type: [String],
    },
    cheapestPrice: {
        type: Number,
        required: true,
    },
    isAdmin :{
        type: Boolean,
        default: false
    },

}, {timestamps:true});

export default mongoose.model("User", userschema) 