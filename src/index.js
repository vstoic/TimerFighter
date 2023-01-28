import Game from './scripts/Game.js'
import Sprite from './scripts/Sprite.js'
import { Howl } from 'howler';

document.addEventListener('DOMContentLoaded', () => {
    let playing = false;
    const canvas = document.getElementById('timer-fighter');
    const c = canvas.getContext('2d')
    const song = new Howl({
        src: ["src/assets/Audio/WaveMeow-Cosmic(cut).mp3"],
        volume: 0.3,
        onplayerror: function () {
            song.once("unlock", function () {
                // song.play();
            });
        },
    });
    canvas.width = 1024;
    canvas.height = 576;
    let game = new Game(c, canvas, canvas.width, canvas.height);
    game.animateGame();
    game.animatePlayer();
    game.animateBot();
    // create model function for character select and time select
    game.decreaseTimer(10);
    // song.play();
    // document.querySelector(".music").addEventListener("click", () => {
    //     music.overworld.play();
    // });
    document.querySelector(".music").addEventListener("click", () => {
        if (song.playing()) {
            song.pause();
        } else {
        
            song.play();
        }
    });
    document.querySelector(".restart").addEventListener("click", () => {
        location.reload();
        
    })
})