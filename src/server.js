const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// configure server security using helmet
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.contentSecurityPolicy({
    directives:{
        defaultSrc:["'self'"]
    }
}));

// configure cors
var corsOptions = {
    origin: ["http://localhost:5000", "https://book-application-d96a.onrender.com"],
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Allow us to send json body data on our requests
app.use(express.json());

// configure
app.get("/", (request, response) => {
    response.json({
        message: "Server running"
    });
});

app.get("/databaseHealth", (request, response) => {
    let databaseState = mongoose.connection.readyState;
    let databaseName = mongoose.connection.name;
    let databaseModels = mongoose.connection.modelNames();
    let databaseHost = mongoose.connection.host;

    response.json({
        readyState: databaseState,
        name: databaseName,
        models: databaseModels,
        host: databaseHost
    });
});

const userRouter = require("./controllers/userController");
const bookRouter = require("./controllers/bookController");
const reviewRouter = require("./controllers/reviewController"); 
const readingProgressRouter = require("./controllers/readingProgressController");

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/reviews", reviewRouter); 
app.use("/readingProgress", readingProgressRouter);

app.use((error, request, response, next) => {
    response.json({
        message: "Something went wrong",
        error: error.message
    });
});

app.get("*", (request, response) => {
    console.log("User tried to visit" + request.path);
    response.status(404).json({
        message: "Page not found.",
        attemptedPath: request.path 
    });
});

// Error handling catcher
app.use((error, request, response, next) => {
    console.log("Error occurred in the server.");
    console.log(JSON.stringify(error));
    response.json({
        errors: request.body.errors,
        message: error.message
    });
});

module.exports = {
    app
}