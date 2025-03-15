const express = require("express");
const { User } = require("../models/userModel");
const { createJwt } = require("../Utils/jwtFunctions");
const { routeRequiresValidJwt } = require("../middleware/UserJwtMiddleware");
const { updateSearchIndex } = require("../models/reviewModel");
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

userRouter.post("/login", async (request, response) => {
    // get user email and password from request
    let {email, password} = request.body;

    // find the user by name 
    let foundUser = await User.findOne({email: email});


    if (foundUser == null) {
        response.json({
            message: "Invalid email or password."
        });
    } else {
        // compare the saved user password to the provided user password
        let doesPasswordMatch = foundUser.comparePassword(password);
        if (doesPasswordMatch) {
            let newJwt = createJwt(foundUser._id, foundUser.name, foundUser.emailVerified);
            
            response.json({
                result: newJwt
            });
        } else {
            response.json({
               message: "Incorrect login details." 
            });
        }
       
    }
});

// userRouter.get("/", routeRequiresValidJwt, async (request, response) => {
//     response.json({
//         message: request.customData
//     });
// });

userRouter.get("/", async (request, response) => {
    const users = await User.find();
    response.json({
        result: users
    });
});

userRouter.put("/:userId", routeRequiresValidJwt, async (request, response) => {
    const { userId } = request.params;
    const { email, about, password } = request.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { email, about, password },
            { new: true }
        );

        if (!updatedUser) {
            return response.status(404).json({
                error: "User not found."
            });
        }

        response.json({
            message: "User details updated successfully!",
            user: updatedUser
        });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

module.exports = userRouter;