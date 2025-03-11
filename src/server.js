const express = require("express");

const app = express();

// configure
app.get("/", (request, response) => {
    response.json({
        message: "Server running"
    });
});

module.exports = {
    app
}