const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const userScema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique : true },
    password: { type: String, required: true },
},
    {
        timestamps: true,
    }
);

// matching incrypted password while sighIn user through "matchPassword()" ------

userScema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}


// incrypting password while sighUn user --------------------
// before writting below logic to incrypt password first (npm i bcryptjs)

userScema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); 
})

const User = mongoose.model("User", userScema);

module.exports = User ;

