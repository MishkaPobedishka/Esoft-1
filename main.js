class TicTacToe {
    game_field;
    players = [];
    field_size = 0;
    turn_number = 1;
    last_turn;

    constructor(players, field_selector) {
        this.game_field = document.getElementsByClassName('game-field')[0];
        this.field_size = field_selector.options[field_selector.selectedIndex].value;
        this.setPlayers(players);
    }

    setPlayers(players) {
        players.forEach(element => {
            this.players.push(element);
        });
    }

    beginGame() {
        let winner;
        let disabledInputs = false;
        this.game_field.onclick = e => {
            if (!disabledInputs) {
                this.disableInputs(true);
                disabledInputs = !disabledInputs;
            }
            if (e.target.className == 'game-field_cell') {
                if (this.checkEmpty(e.target)) {
                    this.makeMove(e.target);
                    this.last_turn = e.target;
                    if (this.turn_number > this.field_size * 2 - 1) {
                        winner = this.checkWin();
                        if (!winner) {
                            disabledInputs = !disabledInputs;
                            if (this.turn_number > Math.pow(this.field_size, 2)) {
                                this.openWinForm("Ничья");
                            }
                        }
                        else {
                            disabledInputs = !disabledInputs;
                            this.openWinForm(`Победил ${winner.name}`);
                        }
                    }
                }
            }
        }
    }


    disableInputs(flag){
        document.getElementById("field-size").disabled = flag;
        document.getElementById("begin").disabled = flag; 
        document.getElementById("first-player").disabled = flag;
        document.getElementById("second-player").disabled = flag;
    }

    openWinForm(result) {
        document.getElementById("winner").innerHTML = result;
        document.getElementById("modal-result-wrapper").style.display = "block";
    }

    generateField() {
        for (let i = 0; i < Math.pow(Number(this.field_size), 2); i++) {
            let clone = document.getElementById("cell").cloneNode(true);
            clone.style.height = `${150 - (Number(this.field_size) - 2) * 10}px`; 
            clone.style.width = `${150 - (Number(this.field_size) - 2) * 10}px`; 
            this.game_field.appendChild(clone);
        }
        this.game_field.style.gridTemplateColumns = `repeat(${this.field_size}, auto)`;
        document.querySelectorAll("svg").forEach(element => {
            element.setAttribute('width', `${150 - (Number(this.field_size) - 2) * 10}px`);
            element.setAttribute('height', `${150 - (Number(this.field_size) - 2) * 10}px`);
        });
    }

    checkEmpty(cell) {
        return cell.children.length == 0;
    }

    makeMove(cell) {
        let clone  = this.turn_number % 2 != 0 ? this.players[0].symbol.cloneNode(true) : this.players[1].symbol.cloneNode(true);
        cell.appendChild(clone);
        this.turn_number++;
    }

    checkWin() {
        let check_array = [];
        let check_array_count = 0;
        let cross_count = 0;
        let circle_count = 0;
        for (let i = 0; i < this.game_field.children.length; i+= Number(this.field_size)) {
            check_array[check_array_count] = []
            for (let j = i; j < i + Number(this.field_size); j++) {
                check_array[check_array_count].push(this.game_field.children[j]);
            }
            check_array_count++;
        }
        for (let i = 0; i < check_array.length; i++) {
            cross_count = 0; circle_count = 0;
            for (let j = 0; j < check_array[i].length; j++) {
                if (check_array[i][j].firstElementChild) {
                    if (check_array[i][j].firstElementChild.id == 'cross') {
                        cross_count++;
                    }
                    if (check_array[i][j].firstElementChild.id == 'circle') {
                        circle_count++;
                    }
                }
            }
            if (cross_count == this.field_size) {
                for (let k = 0; k < check_array.length; k++) {
                    check_array[i][k].querySelector("path").classList.toggle("win")
                }
                return this.players[0];
            }
            if (circle_count == this.field_size) {
                for (let k = 0; k < check_array.length; k++) {
                    check_array[i][k].querySelector("path").classList.toggle("win")
                }
                return this.players[1];
            }
        }

        for (let j = 0; j < check_array.length; j++) {
            cross_count = 0; circle_count = 0;
            for (let i = 0; i < check_array[j].length; i++) {
                if (check_array[i][j].firstElementChild) {
                    if (check_array[i][j].firstElementChild.id == 'cross') {
                        cross_count++;
                    }
                    if (check_array[i][j].firstElementChild.id == 'circle') {
                        circle_count++;
                    }
                }
            }
            if (cross_count == this.field_size) {
                for (let k = 0; k < check_array.length; k++) {
                    check_array[k][j].querySelector("path").classList.toggle("win")
                }
                return this.players[0];
            }
            if (circle_count == this.field_size) {
                for (let k = 0; k < check_array.length; k++) {
                    check_array[k][j].querySelector("path").classList.toggle("win")
                }
                return this.players[1];
            }
        }

        cross_count = 0; circle_count = 0;
        for (let i = 0; i < check_array.length; i++) {
            if (check_array[i][i].firstElementChild) {
                if (check_array[i][i].firstElementChild.id == 'cross') {
                    cross_count++;
                }
                if (check_array[i][i].firstElementChild.id == 'circle') {
                    circle_count++;
                }
            }
        }
        if (cross_count == this.field_size) {
            for (let i = 0; i < check_array.length; i++) {
                check_array[i][i].querySelector("path").classList.toggle("win")
            }
            return this.players[0];
        }
        if (circle_count == this.field_size) {
            for (let i = 0; i < check_array.length; i++) {
                check_array[i][i].querySelector("path").classList.toggle("win")
            }
            return this.players[1];
        }

        cross_count = 0; circle_count = 0;
        for (let i = 0; i < check_array.length; i++){
            if (check_array[check_array.length - i - 1][i].firstElementChild) {
                if (check_array[check_array.length - i - 1][i].firstElementChild.id == 'cross') {
                    cross_count++;
                }
                if (check_array[check_array.length - i - 1][i].firstElementChild.id == 'circle') {
                    circle_count++;
                }
            }
        }
        if (cross_count == this.field_size) {
            for (let i = 0; i < check_array.length; i++) {
                check_array[check_array.length - i -1][i].querySelector("path").classList.toggle("win")
            }
            return this.players[0];
        }
        if (circle_count == this.field_size) {
            for (let i = 0; i < check_array.length; i++) {
                check_array[check_array.length - i -1][i].querySelector("path").classList.toggle("win")
            }
            return this.players[1];
        }

        return false;
    }
}

class Player {
    name;
    symbol;

    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
    }
}

let game;

document.getElementById("begin").onclick = function() {
    field_size_selector = document.getElementById("field-size");
    first_player = document.getElementById("first-player").value;
    second_player = document.getElementById("second-player").value;
    document.getElementById("begin").style.borderColor = "rgba(0, 0, 0, 1)"; 
    if (first_player != "" && second_player != "") {
        game = new TicTacToe([
            new Player(first_player, document.getElementById("cross")),
            new Player(second_player, document.getElementById("circle"))
        ], field_size_selector);
        document.getElementById("field-size").disabled = true;
        document.getElementById("begin").disabled = true; 
        document.getElementById("first-player").disabled = true;
        document.getElementById("second-player").disabled = true;
        game.generateField();
        game.beginGame();
    }
}

document.getElementById("reset").onclick = function() {
    for (let child of game.game_field.children) {
        while (child.firstElementChild) {
            child.firstElementChild.remove();
        }
    }
    game.turn_number = 1;
    document.getElementById("field-size").disabled = false;
        document.getElementById("begin").disabled = false; 
        document.getElementById("first-player").disabled = false;
        document.getElementById("second-player").disabled = false;
}

document.getElementById("field-size").onchange = function() {
    if (game) {
        while (game.game_field.firstElementChild) {
            game.game_field.firstElementChild.remove();
        }
        new_field_size = document.getElementById("field-size")
        document.getElementById("begin").style.borderColor = "rgba(255, 0, 0, 1)";
    } 
}

document.getElementById("end-game").onclick = function() {
    document.getElementById("field-size").disabled = false;
    document.getElementById("begin").disabled = false; 
    document.getElementById("first-player").disabled = false;
    document.getElementById("second-player").disabled = false;
    document.getElementById("modal-result-wrapper").style.display = "none";
    for (let child of game.game_field.children) {
        while (child.firstElementChild) {
            child.firstElementChild.remove();
        }
    } 
    game.turn_number = 1;
}

document.getElementById("revert-turn").onclick = function() {
    if (game.last_turn.firstElementChild) {
        game.turn_number--;
        game.last_turn.firstElementChild.remove();
    }
}