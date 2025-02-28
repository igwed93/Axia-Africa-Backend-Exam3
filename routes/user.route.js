const express = require("express");
const {
    createUser,
    getAllUsers,
    deleteUser,
    updateUser,
    getOneUser,
    loginUser,
    createKyc,
    getKyc
} = require("../controllers/user.controller");
const authorization = require("../middlewares/authorization");

const routes = express.Router();

// CRUD requests
routes.post("/user", createUser);
routes.get("/user", getAllUsers);
routes.delete("/user", authorization, deleteUser);
routes.put("/user", authorization, updateUser);
routes.get("/user/single", authorization, getOneUser);
routes.post("/login", loginUser);
routes.post("/kyc", authorization, createKyc);
routes.get("/kyc/:id", getKyc);

module.exports = routes;