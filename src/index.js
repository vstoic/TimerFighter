import Game from './scripts/Game.js'

document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('timer-fighter');
    const c = canvas.getContext('2d')
    canvas.width = 1024;
    canvas.height = 576;
    // debugger
    let game = new Game(c, canvas, canvas.width, canvas.height);
    game.animate()
    // create model function for character select and time select
    game.decreaseTimer(10)
})