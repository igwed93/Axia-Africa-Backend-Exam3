const express = require("express");
const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(cookieParser()); // used as universal middleware
app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    console.log("connected to database");
})
.catch(()=> {
    console.log("something went wrong");
});

// requests
app.use(userRoutes);
app.use(postRoutes);

app.listen(5050, () => {
    console.log("app is running");
});