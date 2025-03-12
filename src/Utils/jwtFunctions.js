const jsonwebtoken = require("jsonwebtoken");

// function to create JWTs
function createJwt(userId, userName, UserEmailVerified) {
    return jsonwebtoken.sign(
        {
            id: userId,
            name: userName,
            emailVerified: UserEmailVerified
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "1h"
        }
    )
}

// function to verify JWTs
function verifyJwt(providedJwt) {
    let decodedAndVerifiedData = jsonwebtoken.verify(providedJwt, process.env.JWT_SECRET_KEY);

    let newFreshJwt = createJwt(decodedAndVerifiedData.payload.id, decodedAndVerifiedData.payload.name, decodedAndVerifiedData.payload.emailVerified);
    
    return {
        decodedToken: decodedAndVerifiedData,
        newFreshToken: newFreshJwt
    }
}

module.exports = {
    createJwt,
    verifyJwt
}
