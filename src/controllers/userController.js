const express = require("express");
const { User } = require("../models/userModel");
const { createJwt } = require("../Utils/jwtFunctions");
const userRouter = express.Router();

userRouter.post("/", async (request, response) => {
    let {username, email, about, password} = request.body;

    let newUser = await User.create({
        username: username,
        email: email,
        password: password,
        about: about
    });

    let newUserJwt = createJwt(newUser._id, newUser.name, newUser.emailVerified);

    response.json({
        newUser: newUser,
        userJwt: newUserJwt
    });
});

module.exports = userRouter;