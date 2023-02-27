import Game from './scripts/Game.js'
import Sprite from './scripts/Sprite.js'
import { Howl } from 'howler';

document.addEventListener('DOMContentLoaded', () => {
    
    const canvas = document.getElementById('timer-fighter');
    const c = canvas.getContext('2d')
    canvas.width = 1024;
    canvas.height = 576;



    const song = new Howl({
        src: ["src/assets/Audio/WaveMeow-Cosmic(cut).mp3"],
        volume: 0.3,
        onplayerror: function () {
            song.once("unlock", function () {
                // song.play();
            });
        },
    });
    document.querySelector(".music").addEventListener("click", () => {
        if (song.playing()) {
            song.pause();
        } else {
        
            song.play();
        }
    });
    // song.play();
    // document.querySelector(".music").addEventListener("click", () => {
    //     music.overworld.play();
    // });

    const startButton = document.querySelector('#start');
    const menuDiv = document.querySelector('#menu');

    startButton.addEventListener('click', () => {
      // Run a bunch of objects here
        const timeSelect = document.querySelector('#time-select');
        const selectedTime = timeSelect.value;
        menuDiv.style.display = 'none';
        let game = new Game(c, canvas, canvas.width, canvas.height);
        game.animateGame();
        game.animatePlayer();
        game.animateBot();
        game.decreaseTimer(selectedTime);
    });
    

    document.querySelector(".restart").addEventListener("click", () => {
        location.reload();
        
    })
})