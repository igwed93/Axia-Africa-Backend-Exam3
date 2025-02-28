const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    kyc: {
        type: mongoose.Types.ObjectId,
        ref:"kyc",
    },
    posts: [{ type: mongoose.Types.ObjectId, ref: "Post"}]
},
{timestamps: true}
);

const userModel = mongoose.model("User", user);
module.exports = userModel;

