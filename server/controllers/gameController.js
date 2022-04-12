const fs = require('fs');
const fileName = '../server/files/gamesResult.json';

module.exports = {
  writeGameResult(req, res) {
    const body = req.body;
    const gameResultFile = fs.readFileSync(fileName).toString();
    let gameNumber;
    if (gameResultFile.length - 1 < 0) {
      gameNumber = 1;
    } else {
      gameNumber = gameResultFile.split('\n').length
    }
    let winner, loser, stringInfo;
    if (req.body.winner) {
      if (req.body.players[0].name == req.body.winner){
        stringInfo = JSON.stringify({
          id: gameNumber,
          gameResult: `Победил ${req.body.winner}`,
          firstPlayerName: req.body.players[0].name,
          secondPlayerName: req.body.players[1].name,
          fieldSize: `${req.body.fieldSize}x${req.body.fieldSize}`
        })
      }
      else{
        stringInfo = JSON.stringify({
          id: gameNumber,
          gameResult: `Победил ${req.body.winner}`,
          firstPlayerName: req.body.players[0].name,
          secondPlayerName: req.body.players[1].name,
          fieldSize: `${req.body.fieldSize}x${req.body.fieldSize}`
        })
      }
    }
    else{
      stringInfo = JSON.stringify({
        id: gameNumber,
        gameResult: 'Ничья',
        firstPlayerName: req.body.players[0].name,
        secondPlayerName: req.body.players[1].name,
        fieldSize: `${req.body.fieldSize}x${req.body.fieldSize}`
      })
    }
    fs.appendFile(fileName,
      stringInfo + '\n',
      (err) => {
        if (err) throw err;
      });
  }
}