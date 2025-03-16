const validator = require("validator");

function checkIfEmail(request, response, next) {
    let emailToCheck = request.body.email;

    let emailValid = validator.isEmail(emailToCheck);

    if (!emailValid) {
        next(new Error("Invalid email, check format"));
    } else {
        next();
    }
}

function checkUsernameLength(request, response, next) {
    let usernameToCheck = request.body.username;

    if (usernameToCheck.length < 3) {
        next(new Error("Username must be at least 3 characters"));
    } else {
        next();
    }
}

function checkPasswordLength(request, response, next) {
    let passwordToCheck = request.body.password;

    if (passwordToCheck.length < 8) {
        next(new Error("Password must be at least 8 characters long"));
    } else {
        next();
    }
}



module.exports = {
    checkIfEmail,
    checkUsernameLength,
    checkPasswordLength,
}