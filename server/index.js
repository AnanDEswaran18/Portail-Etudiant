// import modules
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config();
const testRoutes = require("./routes/test")

// app
const app = express()

// db

mongoose
    .connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("DB CONNECTED")
    })
    .catch((error)=>{
        console.log("DB Connection Error")
    })

// middleware
app.use(morgan("dev"))
app.use(cors({ origin: true, credentials: true }))
// routes
app.get("/", (req, res) => {
    res.send("hi");
})
app.use("/test", testRoutes)

// port and listener
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Running..");
})

/*function greet(name) {
    console.log(`Hello, ${name}!`);
}

setTimeout(greet, 5000, 'John');
*/