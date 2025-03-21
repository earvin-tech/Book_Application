const { default: mongoose } = require("mongoose");
const { User } = require("../models/userModel");
const { Book } = require("../models/bookModel");
const { Review } = require("../models/reviewModel");
const { ReadingProgress } = require("../models/readingProgressModel");


async function databaseConnect(targetDatabaseURL = null) {
    console.log("Starting database connection!");
    let actualDatabaseURL = targetDatabaseURL || process.env.DATABASE_URL;
    console.log(actualDatabaseURL);
    await mongoose.connect(actualDatabaseURL);
}


// async function databaseDisconnect() {
//     console.log("Closing database connection!");
//     await mongoose.connection.close();
// }

module.exports = {
    databaseConnect,
    // databaseDisconnect
}