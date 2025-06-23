const mongoose = require("mongoose")

const database = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => console.log("Database Connected Successfully"))
        .catch((err) => console.log("Error Connecting to Mongodb => ", err));
}

module.exports = database;