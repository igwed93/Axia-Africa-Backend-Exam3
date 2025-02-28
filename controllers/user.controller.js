const userModel = require("../models/user.model");
const kycModel = require("../models/kyc");
const postModel = require("../models/post.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// creating a user function
const createUser = async(req, res) => {
    const {password, ...others} = req.body;
    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // check user existence
    const isUser = await userModel.findOne({email: others.email});
    if (isUser) {
        return res.status(400).json({message: "User already exists!"});
    }
    try {
        const newUser = new userModel({ ...others, password: hashedPassword });
        await newUser.save();
        return res.status(201).send("User created successfully!");
    } catch (error) {
        return res.send(error);
    }
};

// getting all the user
const getAllUsers = async(req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.send(error);
    }
}

// delete a user
const deleteUser = async(req, res) => {
    const user = req.user;
    try {
        // Delete KYC and Posts concurrently
        await Promise.all([
            kycModel.deleteOne({ user: user }),
            postModel.deleteMany({ creator: user }),
            userModel.findByIdAndDelete(user),
        ]);
        return res.status(200).send("User deleted successfuly!");
    } catch (error) {
        return res.status(500).send(error);
    }
}

// update a user
const updateUser = async(req, res) => {
    const user = req.user;
    console.log(user);
    const {username, age, occupation} = req.body;
    try {
    await userModel.findByIdAndUpdate(user, {username, age, occupation}, {new: true, runValidators: true});
    return res.status(200).send("User updated successfully!");
    } catch (error) {
    return res.status(500).send(error);
    }
}

// get one user
const getOneUser = async(req, res) => {
    const user = req.user;
    try {
        const oneUser = await userModel.findById(user).populate({path: "kyc"}).populate("posts");
        if (!oneUser) {
            return res.status(404).send("user does not exist!");
        }
        return res.status(200).json(oneUser);
    } catch (error) {
        return res.status(500).send("something went wrong.");
    }
};

// login user
const loginUser = async(req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({message: "Provide valid credentials!"});
    }
    // check if user already exists
    const checkUser = await userModel.findOne({email});
    if (!checkUser) {
        return res.status(404).json({message: "User not found, please register!"});
    }
    // check password
    const isPasswordValid = bcrypt.compareSync(password, checkUser.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
        return res.status(401).json({message: "password is not valid"});
    }
    // create jwt token
    const token = jwt.sign({id: checkUser.id}, process.env.JWT_SECRET);
    // then return the person's information to the frontend
    return res
    .cookie("token", token, { httpOnly:true })
    .status(200)
    .json(checkUser);
};


// submit kyc
const createKyc = async(req, res) => {
    const body = req.body;
    const user = req.user;
    try {
        // first create the kyc
        const kyc = new kycModel({...body, user});
        const savedKyc = await kyc.save();

        // update the user model kyc field
        await userModel.findByIdAndUpdate(user, {kyc: savedKyc.id}, {new: true});
        return res.status(201).send("kyc created succeessfully");
    } catch (error) {
        return res.status(501).json({message: "something went wrong.", error});
    }
};

// get one kyc
const getKyc = async(req, res) => {
    const { id } = req.params;
    try {
        const oneKyc = await kycModel
        .findById(id)
        .populate({ path: "user", select: "name email -_id" });
        return res.status(200).json(oneKyc);
    } catch (error) {
        return res.status(500).send("something went wrong");
    }
};

module.exports = {
    createUser,
    getAllUsers,
    deleteUser,
    updateUser,
    getOneUser,
    loginUser,
    createKyc,
    getKyc
};