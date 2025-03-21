const { User } = require("../models/userModel");
const { Book } = require("../models/bookModel");
const { ReadingProgress } = require("../models/readingProgressModel");
const { databaseConnect, databaseDisconnect } = require("./database");
const dotenv = require("dotenv");
const Review = require("../models/reviewModel");

dotenv.config();

databaseConnect();

async function seedData() {

    let newUsers = [
        {
            username: "Mark_Johnson12",
            email: "markj12@gmail.com",
            about: "It's Marky Mark yo!",
            password: "marktheMAN12"
        },
        {
            username: "Earvin",
            email: "earvinemail@gmail.com",
            password: "earvinpw345"
        },
        {
            username: "The Rock",
            email: "dwaynejohnson@gmail.com",
            about: "Can you smell what The Rock is cooking?!!",
            password: "WWE1234Mcmahon"
        }

    ];

    await User.create(newUsers);

    let userId1 = await User.find({username: "Earvin"}).
        then(
            users => {
                return users[0]._id;
            }
        );

    let userId2 = await User.find({username: "Mark_Johnson12"}).
    then(
        users2 => {
            return users2[0]._id;
        }
    );

    let userId3 = await User.find({username: "The Rock"}).
        then(
            users3 => {
                return users3[0]._id;
            }
        );

    
    let newBooks = [
        {
            userId: userId1,
            title: "Lord of the Rings: The Fellowship of The Ring",
            author: "J.R.R Tolkien",
            genre: "Fantasy",
            summary: "In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell into the hands of Bilbo Baggins, as told in The Hobbit. In a sleepy village in the Shire, young Frodo Baggins finds himself faced with an immense task, as his elderly cousin Bilbo entrusts the Ring to his care. Frodo must leave his home and make a perilous journey across Middle-earth to the Cracks of Doom, there to destroy the Ring and foil the Dark Lord in his evil purpose."
        },
        {
            userId: userId2,
            title: "The Hunger Games",
            author: "Suzanne Collins",
            genre: "Dystopian",
            summary: "In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and one girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV. Sixteen-year-old Katniss Everdeen regards it as a death sentence when she steps forward to take her sister's place in the Games. But Katniss has been close to dead before-and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weigh survival against humanity and life against love."
        },
        {   userId: userId1,
            title: "The Art of War",
            author: "Sun Tzu",
            genre: "Treatise"
        }
    ];

    await Book.create(newBooks);

    let bookId1 = await Book.find({title: "Lord of the Rings: The Fellowship of The Ring"}).
        then(
            books => {
                return books[0]._id;
        }
    )

    let bookId2 = await Book.find({title: "The Hunger Games"}).
        then(
            books2 => {
                return books2[0]._id;
        }
    )

    let readingProgresses = [
        {
            user: userId1,
            book: bookId1,
            progress: "In Progress"
        },
        {
            user: userId2,
            book: bookId2,
            progress: "Completed"
        }
    ];

    await ReadingProgress.create(readingProgresses);

    let reviews = [
        {
            body: "Pretty good so far, watched the movies and the book has additional lore and character development.",
            rating: 4,
            user: userId1,
            book: bookId1
        },
        {
            body: "Amazing first book of the trilogy can't wait to read the rest!",
            rating: 5,
            user: userId2,
            book: bookId2
        }
    ];

    await Review.create(reviews);
}


seedData();

console.log("Database seeded.");

// databaseDisconnect();