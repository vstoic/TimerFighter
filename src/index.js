import Game from './scripts/game.js'

document.addEventListener('DOMContentLoaded', () => {

    // const canvas = document.querySelector('canvas')
    const canvas = document.getElementById('timer-fighter');
    const c = canvas.getContext('2d')

    // new Sprite(canvas);

    //setting canvas on weidth and height to 1024/576
    canvas.width = 1024;
    canvas.height = 576;


    //using canvas api (.fillRect draws a rectangle) to fill up canvas at starting from  0,0
    // c.fillRect(0, 0, canvas.width, canvas.height)


    // debugger
    let game = new Game(c, canvas, canvas.width, canvas.height);

    game.animate()

    
})