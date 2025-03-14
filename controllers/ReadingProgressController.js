const express = require("express");
const { ReadingProgress } = require("./ReadingProgressController");
const readingProgressRouter = express.Router();

readingProgressRouter.post("/", async (request, response) => {
  let { user, book, progress } = request.body;

  try {
    let newReadingProgress = await ReadingProgress.create({
      user: user,
      book: book,
      progress: progress,
    });

    response.json({
      newReadingProgress: newReadingProgress,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

readingProgressRouter.get("/:userId/:bookId", async (request, response) => {
  let { userId, bookId } = request.params;

  try {
    let readingProgress = await ReadingProgress.findOne({
      user: userId,
      book: bookId,
    });

    if (!readingProgress) {
      return response.status(404).json({ message: "Reading progress not found" });
    }

    response.json({
      readingProgress: readingProgress,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// Update reading progress for a specific user and book
readingProgressRouter.put("/:userId/:bookId", async (request, response) => {
  let { userId, bookId } = request.params;
  let { progress } = request.body;

  try {
    let updatedReadingProgress = await ReadingProgress.findOneAndUpdate(
      { user: userId, book: bookId },
      { progress: progress, lastUpdated: Date.now() },
      { new: true } 
    );

    if (!updatedReadingProgress) {
      return response.status(404).json({ message: "Reading progress not found" });
    }

    response.json({
      updatedReadingProgress: updatedReadingProgress,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});


readingProgressRouter.delete("/:userId/:bookId", async (request, response) => {
  let { userId, bookId } = request.params;

  try {
    let deletedReadingProgress = await ReadingProgress.findOneAndDelete({
      user: userId,
      book: bookId,
    });

    if (!deletedReadingProgress) {
      return response.status(404).json({ message: "Reading progress not found" });
    }

    response.json({
      message: "Reading progress deleted successfully",
      deletedReadingProgress: deletedReadingProgress,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = readingProgressRouter;