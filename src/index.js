import Game from './scripts/game.js'

document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('timer-fighter');
    const c = canvas.getContext('2d')

    //setting canvas on weidth and height to 1024/576
    canvas.width = 1024;
    canvas.height = 576;


    // debugger
    let game = new Game(c, canvas, canvas.width, canvas.height);
    game.animate()
    game.decreaseTimer()

    
})