const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true 
    }, 
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    }, 
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }, 
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    }, 
    timestamp: {
      type: Date,
      default: Date.now
    } 
  },
  {
    timestamps: true
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;