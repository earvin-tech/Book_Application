const express = require("express");
const { Book } = require("../models/bookModel");
const bookRouter = express.Router();

bookRouter.post("/", async (request, response) => {
    let {title, author, genre, summary} = request.body;

    let newBook = await Book.create({
        title: title,
        author: author,
        genre: genre,
        summary: summary
    });

    response.json({
        newBook: newBook
    });
});

bookRouter.get("/", async (request, response) => {
    let books = await Book.find();
    console.log(books);
    response.json({
        result: books
    });
});
module.exports = bookRouter;