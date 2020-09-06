const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./confg/keys").mongoURI;
const users = require("./routes/api/users");
const User = require('./models/User');

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.log(err));



app.get("/", (req, res) => {
    const user = new User({
        name: "jim",
        email: "jim@jim.jim",
        password: "jimisgreat123"
    })
    user.save()
    res.send("Hello Wayne!")
});

app.use("/api/users", users);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});