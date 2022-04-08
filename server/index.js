const express = require('express');
const app = express();
const PORT = 5000;

const startServer = async () => {
    try {
        app.listen(PORT, () => 
        console.log(`Server start at port ${PORT}`))
    } catch (err) {
        console.log(err);
    }
}

startServer();