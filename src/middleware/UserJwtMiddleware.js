const { verifyJwt } = require("../Utils/jwtFunctions");


async function routeRequiresValidJwt(request, response,next) {
    try {

        // pull jwt from request header
        // console.log(request.headers);
        // console.log(request.headers.jwt);
        if (request.headers.authorization == null || request.headers.authorization.length < 8) {
            return next(new Error("No auth header provided!"));
        }
        let jwtHeaderValue = request.headers.authorization.replace("Bearer ", "");
        console.log(request.headers.authorization);
        // console.log(jwtHeaderValue);
    
        // verify jwt
        // make new jwt
        let isTokenValid = verifyJwt(jwtHeaderValue);
        console.log(isTokenValid);
    
        // add the new jwt to the response header
        request.customData = {
            ...request.customData || {}, // if existing customData properties exist, don't overwrite them - merge them!
            decodedToken: isTokenValid.decodedToken,
            newFreshToken: isTokenValid.newFreshToken
        }
    
        // move on to the next step in the middleware chain
        next();
    } catch (error) {
            response.json({
                message: "JWT expired, please login again"
            });
        }
    
}

module.exports = {
    routeRequiresValidJwt
}