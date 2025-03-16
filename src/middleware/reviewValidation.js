const validator = require("validator");


function checkRating(request, response, next) {
    const rating = request.body.rating;

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
        return next(new Error("Rating must be a number between 1 and 5"));
    }

    next();
}


function checkComment(request, response, next) {
    const comment = request.body.comment;

    if (comment && (typeof comment !== "string" || comment.length > 500)) {
        return next(new Error("Comment must be a string and cannot exceed 500 characters"));
    }

    next();
}

function checkProductId(request, response, next) {
    const productId = request.body.productId;

    if (!productId || typeof productId !== "string" || productId.trim() === "") {
        return next(new Error("Product ID must be a non-empty string"));
    }

    next();
}

function checkReviewId(request, response, next) {
    const reviewId = request.params.reviewId;

    if (!reviewId || typeof reviewId !== "string" || reviewId.trim() === "") {
        return next(new Error("Review ID must be a non-empty string"));
    }

    next();
}

module.exports = {
    checkRating,
    checkComment,
    checkProductId,
    checkReviewId,
};