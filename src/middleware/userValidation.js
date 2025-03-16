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



module.exports = {
    checkIfEmail,
}