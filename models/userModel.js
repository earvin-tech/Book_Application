const { default: mongoose } = require("mongoose")
const crypto = require("node:crypto");

// MAKE USER SCHEMA
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: false
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

userSchema.pre("save", async (next) => {
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

// MAKE A MODEL USING USER SCHEMA
const User = mongoose.model("User", userSchema);

// EXPORT USER MODEL
module.exports = {
    User
}