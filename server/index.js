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
        console.log("DB Connection Error - ",error)
    })

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    name: String,
    age: Number,
});

const DataModel = mongoose.model('Data', dataSchema);

async function insertData() {
    try {
        const newData = new DataModel({ name: 'John', age: 25 });
        await newData.save();
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data', error);
    }
}

async function retrieveData() {
    try {
        const data = await DataModel.find();
        const names = data.map((item) => item.name);
        console.log('Retrieved data:',names);
    } catch (error) {
        console.error('Error fetching data', error);
    }
}

async function run() {
    // await insertData();
    await retrieveData();
}

run();

// middleware
app.use(morgan("dev"))
app.use(cors({ origin: true, credentials: true }))
// routes
app.get("/", (req, res) => {
    res.send("hi");
})
app.use("/test", testRoutes)

// port and listener
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Running..");
})

/*function greet(name) {
    console.log(`Hello, ${name}!`);
}

setTimeout(greet, 5000, 'John');
*/