import { Howl } from 'howler';
class SoundPlayer {
  constructor() {
    this.jump = new Howl({
        src: ["src/assets/Audio/jump.mp3"],
        volume: 0.3,
        onplayerror: function () {
            song.once("unlock", function () {
            });
        },
    });
    this.punch = new Howl({
        src: ["src/assets/Audio/punch.mp3"],
        volume: 0.3,
        rate: 0.5,
        onplayerror: function () {
            song.once("unlock", function () {
            });
        },
    });
    this.teleport = new Howl({
        src: ["src/assets/Audio/teleport.mp3"],
        volume: 0.3,
        onplayerror: function () {
            song.once("unlock", function () {
            });
        },
    });
  }
  
  playJumpSound() {
    this.jump.play()
  }
  playPunchSound() {
    this.punch.play();
  }
  playTeleportSound() {
    this.teleport.play();
  }
}

export default SoundPlayer;