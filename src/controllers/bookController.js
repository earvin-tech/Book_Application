const express = require("express");
const { Book } = require("../models/bookModel");
const bookRouter = express.Router();

bookRouter.post("/", async (request, response) => {
    let {userId,title, author, genre, summary, ratingsCount} = request.body;
    
    try{
        let newBook = await Book.create({
            userId: userId,
            title: title,
            author: author,
            genre: genre,
            summary: summary,
            ratingsCount: ratingsCount
        });
    
        response.json({
            newBook: newBook
        });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

bookRouter.get("/", async (request, response) => {
    let books = await Book.find();
    console.log(books);
    response.json({
        result: books
    });
});

bookRouter.delete("/:bookId", async (request, response) => {
    let bookId = request.params.bookId;
    // console.log(userId, bookId);
    try {
        let deletedBook = await Book.deleteOne({
            _id: bookId
        });
        // console.log(deletedBook);

        if (!deletedBook) {
            return response.status(404).json({
                message: "Book not found."
            });
        } else {
            response.json({
                message: "Book has been deleted successfully.",
                deletedBook: deletedBook
            });
        }
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

bookRouter.post('/rate/:bookId', async (request, response) => {
    const { rating } = request.body; // rating submitted by the user
    const bookId = request.params.bookId;

    try {
        let book = await Book.findById(bookId);
        if (!book) {
            return response.status(404).json({ message: "Book not found." });
        }

        // Calculate the new average rating
        let newAverage = (book.averageRating * book.ratingsCount + rating) / (book.ratingsCount + 1);
        let newRatingsCount = book.ratingsCount + 1;

        // Update the book
        book.averageRating = newAverage;
        book.ratingsCount = newRatingsCount;
        await book.save();

        response.json({ message: "Rating added successfully", book });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});
module.exports = bookRouter;
