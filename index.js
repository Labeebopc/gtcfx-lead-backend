const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv").config()
const morgan = require("morgan")
const rateLimit = require("express-rate-limit")

const { readdirSync } = require("fs")
const database = require("./config/database.js")


const app = express();

// Middlewares-processing incoming HTTP requests
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors());
app.use(morgan('dev'));

// Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);

//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));


// database
mongoose.set("strictQuery", true);
database();

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
