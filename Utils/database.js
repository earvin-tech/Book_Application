const { default: mongoose } = require("mongoose");


async function databaseConnect(targetDatabaseURL = null) {
    console.log("Starting database connection!");
    let actualDatabaseURL = targetDatabaseURL || process.env.DATABASE_URL;
    console.log(actualDatabaseURL);
    await mongoose.connect(actualDatabaseURL);
}


async function databaseDisconnect() {
    
}

module.exports = {
    databaseConnect,
    databaseDisconnect
}