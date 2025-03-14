const { default: mongoose } = require("mongoose");


const bookSchema = new mongoose.Schema(
    {
        user: {
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
    },
    {
        timestamps: true
    }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = {
    Book
}