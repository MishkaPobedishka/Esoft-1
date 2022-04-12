const express = require('express');
const path = require('path');
const router = express.Router();
const {writeGameResult} = require("../controllers/gameController");

router.post('/api/game',  (req,res) => {
        writeGameResult(req, res);
    })
module.exports = router;