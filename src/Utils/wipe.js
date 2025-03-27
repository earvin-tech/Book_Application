const { Book } = require("../models/bookModel");
const { ReadingProgress } = require("../models/readingProgressModel");
const Review = require("../models/reviewModel");
const { User } = require("../models/userModel");
const { databaseConnect, databaseDisconnect } = require("./database");
const dotenv = require("dotenv");

dotenv.config();

databaseConnect();

User.collection.deleteMany({});
Book.collection.deleteMany({});
ReadingProgress.collection.deleteMany({});
Review.collection.deleteMany({});

// console.log(User.find());

console.log("Database wiped.")

// databaseDisconnect();