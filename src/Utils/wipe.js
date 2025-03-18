const { Book } = require("../models/bookModel");
const { User } = require("../models/userModel");
const { databaseConnect, databaseDisconnect } = require("./database");
const dotenv = require("dotenv");

dotenv.config();

databaseConnect();

User.collection.deleteMany({});
Book.collection.deleteMany({});

// console.log(User.find());

console.log("Database wiped.")

// databaseDisconnect();