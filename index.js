// get elements with specific id
let b1 = document.getElementById('b1')
let b2 = document.getElementById('b2')
let b3 = document.getElementById('b3')
let b4 = document.getElementById('b4')
let b5 = document.getElementById('b5')
let b6 = document.getElementById('b6')
let b7 = document.getElementById('b7')
let b8 = document.getElementById('b8')
let b9 = document.getElementById('b9')
let turn_indicator = document.getElementById('turn-indicator')
let reset = document.getElementById('reset')
let undo = document.getElementById('undo')

// get all elements that has the class 'grid'
let grids = document.getElementsByClassName('grid')
let turn = 'Player 1'
let move_history = [] // initializing a variable with a value


// let sample = '' // string
// let sample = 0 // integer
// let sample = [] // array --> C# Version: int[] array = new int[5];
// let sample = {} // object --> C# Version: new Dictionary<string, string>()

// let obj = {
//     "1" : "one",
//     "2" : 2
// }

// var cities = new Dictionary<string, int>(){
// 	{"1", 1},
// 	{"2", 1}
// };

// string, integers, N


square_grids()
set_click_listeners()

// this function is used to transform the grids into square
function square_grids() {
    // loop through all the elements that has the class 'grid'
    for (let i=0; i < grids.length; i++) {
        // get computed with of the element
        let width = window.getComputedStyle(grids[i]).width

        // set height in the same value as the width
        grids[i].style.height = width
    }
}


function set_click_listeners() {
    // set click listeners for the grids
    for (let i=0; i < grids.length; i++) {
        grids[i].addEventListener('click', function() {
            let current_turn = turn

            // Player 1's turn
            if (turn == "Player 1") {
                grids[i].value = 'X'
                turn = "Player 2"
                turn_indicator.style.color = 'red'
            }
            
            // Player 2's turn
            else {
                grids[i].value = 'O'
                turn = "Player 1"
                turn_indicator.style.color = 'dodgerblue'
            }

            grids[i].disabled = true

            // check if the game is over
            if (is_over()) {
                turn_indicator.style.color = 'black'
                turn_indicator.innerHTML = 'This game is a Tie!'
            }

            let has_winner = validate_board(grids[i].id)

            if (has_winner) {
                turn_indicator.style.color = 'black'
                turn_indicator.innerHTML = current_turn + ' wins!!'
                disable_grids()
            }

            else {
                turn_indicator.innerHTML = turn + "'s Turn"
            }

            move_history.push(grids[i])
        })
    }

    reset.addEventListener('click', function() {
        location.reload()
    })

    undo.addEventListener('click', function() {
        // move_history = [b1, b2]
        // length == 2
        // index = 1

        if (move_history.length > 0) {
            let last_element = move_history[move_history.length - 1]
            last_element.disabled = false
            last_element.value = ""
            move_history.pop()

            if (turn == "Player 1") {
                turn = "Player 2"
                turn_indicator.style.color = 'red'
                turn_indicator.innerHTML = turn + "'s Turn"
            }

            else {
                turn = "Player 1"
                turn_indicator.style.color = 'dodgerblue'
                turn_indicator.innerHTML = turn + "'s Turn"
            }
        }
    })
}


// this function will check if there is a winner
function validate_board(grid_id) {
    let patterns = {
        'b1' : [
            [b1, b2, b3],
            [b1, b4, b7],
            [b1, b5, b9]
        ],
    
        'b2' : [
            [b1, b2, b3],
            [b2, b5, b8]
        ],
    
        'b3' : [
            [b1, b2, b3],
            [b3, b5, b7],
            [b3, b6, b9]
        ],
    
        'b4' : [
            [b1, b4, b7],
            [b4, b5, b6]
        ],
    
        'b5' : [
            [b1, b5, b9],
            [b2, b5, b8],
            [b3, b5, b7],
            [b4, b5, b6]
        ],
    
        'b6' : [
            [b3, b6, b9],
            [b4, b5, b6]
        ],
    
        'b7' : [
            [b1, b4, b7],
            [b7, b5, b3],
            [b7, b8, b9]
        ],
    
        'b8' : [
            [b2, b5, b8],
            [b7, b8, b9]
        ],
    
        'b9' : [
            [b3, b6, b9],
            [b9, b5, b1],
            [b7, b8, b9]
        ]
    }
    
    let pattern = patterns[grid_id]
    for (let i = 0; i < pattern.length; i++) {
        console.log(pattern[i])

        if (pattern[i][0].value == pattern[i][1].value && pattern[i][0].value == pattern[i][2].value) {
            return true
        }
    }

    return false
}

// this function check if the game is over
function is_over() {
    for (let i = 0; i < grids.length; i++) {

        if (!grids[i].disabled) {
            return false
        }
    }

    return true
}

function disable_grids() {
    for (let i = 0; i < grids.length; i++) {
        grids[i].disabled = true
    }
}