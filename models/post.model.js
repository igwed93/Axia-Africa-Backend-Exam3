const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    projectLink: {
        type: String,
        required: true
    },
    projectPreview: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
},
{timestamps: true}
);



const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;