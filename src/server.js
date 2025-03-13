const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();

// Allow us to send json body data on our requests
app.use(express.json());

// configure
app.get("/", (request, response) => {
    response.json({
        message: "Server running"
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
app.use("/users", userRouter);
const bookRouter = require("./controllers/bookController");
app.use("/books", bookRouter);

app.use((error, request, response, next) => {
    response.json({
        message: "Something went wrong",
        error: error.message
    });
});

module.exports = {
    app
}