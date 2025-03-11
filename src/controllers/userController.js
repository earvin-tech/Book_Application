const express = require("express");
const { User } = require("../models/userModel");
const userRouter = express.Router();

userRouter.post("/", async (request, response) => {
    let {username, email, about, password} = request.body;

    let newUser = await User.create({
        username: username,
        email: email,
        password: password,
        about: about
    });

    response.json({
        newUser: newUser
    });
});

module.exports = userRouter;