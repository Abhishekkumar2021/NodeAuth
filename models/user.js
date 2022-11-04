const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required!"],
        unique: [ true, "Username already exists!" ],
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minLength: [8, "Password must be at least 8 characters long!"],
    }
});
const User = mongoose.model("User", userSchema);
// async function createUser(username, password) {
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const user = new User({ username, password: hashedPassword });
//     await user.save();
//     return user;
// }
// createUser("test", "test").then(() => console.log("User created!"));
module.exports = User;