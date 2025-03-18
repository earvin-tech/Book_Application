const { Book } = require("../models/bookModel");
const { ReadingProgress } = require("../models/readingProgressModel");
const { User } = require("../models/userModel");
const { databaseConnect, databaseDisconnect } = require("./database");
const dotenv = require("dotenv");

dotenv.config();

databaseConnect();

User.collection.deleteMany({});
Book.collection.deleteMany({});
ReadingProgress.deleteMany({});

// console.log(User.find());

console.log("Database wiped.")

// databaseDisconnect();