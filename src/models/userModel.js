const { default: mongoose } = require("mongoose")
const crypto = require("node:crypto");

// MAKE USER SCHEMA
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: false,
            minLength: 3
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        about: {
            type: String,
            required: false,
            unique: false
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
            unique: false
        },
        salt: {
            type: String,
            required: false,
            unique: false,
            default: function () {
                // generate random salt value
                let newUserSalt = crypto.randomBytes(64).toString("hex");
                // return salt 
                return newUserSalt;
            }
        },
        emailVerified: {
            type: Boolean,
            required: false,
            default: false
        }
    }, 
    {
        timestamps: true
    }
);

// check for raw pw and hash

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    // assume pw has been modified here onwards
    if (!this.salt) {
        this.salt = crypto.randomBytes(64).toString("hex");
    }

    this.password = crypto.scryptSync(this.password, this.salt, 64).toString("hex");

    next();
});

// add a compare password method to model
userSchema.methods.comparePassword = function (passwordToCheck) {
    // grab user salt value
    let userSalt = this.salt;

    // hash and salt password to check
    let hashedAndSaltedPasswordToCheck = crypto.scryptSync(passwordToCheck, userSalt, 64).toString("hex");

    // compare hashed and salted version of passwordToCheck against user's password
    return this.password == hashedAndSaltedPasswordToCheck;
}

// MAKE A MODEL USING USER SCHEMA
const User = mongoose.model("User", userSchema);

// EXPORT USER MODEL
module.exports = {User};