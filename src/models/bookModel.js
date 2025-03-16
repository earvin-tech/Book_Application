const { default: mongoose } = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true,
            unique: true
        },
        author: {
            type: String,
            required: true,
            unique: false
        },
        genre: {
            type: String,
            required: true,
            unique: false
        },
        summary: {
            type: String,
            required: false,
            unique: false
        }
          ratingsCount: {
            type: Number,
            required: true,
            default: 0
        },
        averageRating: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = {
    Book
}
