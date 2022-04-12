require('dotenv').config();
const express = require('express');
const bp = require('body-parser');
const mainRouter = require("./routes/index")
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");

app.use(cors({
    origin: "http://127.0.0.1:5500"
}))
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(mainRouter);
app.use(express.static('client'));


const startServer = async () => {
    try {
        app.listen(PORT, () => 
        console.log(`Server start at port ${PORT}`))
    } catch (err) {
        console.log(err);
    }
}

startServer();