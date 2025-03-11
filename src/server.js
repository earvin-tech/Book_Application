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

module.exports = {
    app
}