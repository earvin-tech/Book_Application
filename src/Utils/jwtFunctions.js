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
            expiresIn: "6h"
        }
    )
}

// function to verify JWTs
function verifyJwt(providedJwt) {
    let decodedAndVerifiedData = jsonwebtoken.verify(providedJwt, process.env.JWT_SECRET_KEY);

    console.log(decodedAndVerifiedData);

    let newFreshJwt = createJwt(decodedAndVerifiedData.id, decodedAndVerifiedData.name, decodedAndVerifiedData.emailVerified);
    
    return {
        decodedToken: decodedAndVerifiedData,
        newFreshToken: newFreshJwt
    }
}

module.exports = {
    createJwt,
    verifyJwt
}
