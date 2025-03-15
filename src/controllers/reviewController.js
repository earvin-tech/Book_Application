const express = require("express");
const { Book } = require("../models/bookModel");
const { User } = require("../models/userModel");
const Review = require("../models/reviewModel");
const reviewRouter = express.Router();

reviewRouter.post("/", async (request, response) => {
  const { body, rating, userId, bookId } = request.body;

  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      return response.status(404).json({ error: "Uh oh! User or Book not found" });
    }

   
    const newReview = await Review.create({
      body,
      rating,
      user: userId,
      book: bookId,
    });

    // console.log(newReview);
    // book.reviews.push(newReview._id);
    // await book.save();

    response.status(201).json({
      message: "Review posted successfully",
      review: newReview,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});


reviewRouter.get("/book/:bookId", async (request, response) => {
  const { bookId } = request.params;

  try {
    const reviews = await Review.find({ book: bookId }).populate("user", "username"); 
    response.json({
      reviews,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});


reviewRouter.get("/:reviewId", async (request, response) => {
  const { reviewId } = request.params;

  try {
    const review = await Review.findById(reviewId).populate("user", "username"); 
    if (!review) {
      return response.status(404).json({ error: "Review not found" });
    }
    response.json({
      review,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});


reviewRouter.put("/:reviewId", async (request, response) => {
  const { reviewId } = request.params;
  const { body, rating } = request.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { body, rating },
      { new: true } 
    );

    if (!updatedReview) {
      return response.status(404).json({ error: "Review not found" });
    }

    response.json({
      message: "Review updated successfully",
      review: updatedReview,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});


reviewRouter.delete("/:reviewId", async (request, response) => {
  const { reviewId } = request.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return response.status(404).json({ error: "Review not found" });
    }

    
    const book = await Book.findById(deletedReview.book);
    if (book) {
      book.reviews = book.reviews.filter((id) => id.toString() !== reviewId);
      await book.save();
    }

    response.json({
      message: "Review deleted successfully",
      review: deletedReview,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = reviewRouter;