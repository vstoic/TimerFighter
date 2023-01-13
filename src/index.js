import Game from './scripts/Game.js'
import Sprite from './scripts/Sprite.js'
import { Howl } from 'howler';

document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('timer-fighter');
    const c = canvas.getContext('2d')
    const song = new Howl({
      src: ["src/assets/Audio/Logic_Super_Mario_World.mp3"],
      onplayerror: function () {
        song.once("unlock", function () {
          song.play();
        });
      },
    });
    canvas.width = 1024;
    canvas.height = 576;
    // debugger
    let game = new Game(c, canvas, canvas.width, canvas.height);
    game.animateGame();
    game.animatePlayer();
    game.animateBot();
    // create model function for character select and time select
    game.decreaseTimer(60);
    song.play();
})