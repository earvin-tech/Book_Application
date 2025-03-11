const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();

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

module.exports = {
    app
}