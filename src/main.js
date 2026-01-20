//Mods I have implemented so far:
//  Timer display !3 points!
// mouse control for rocket and firing !5 points!
//Time increase when hitting a spaceship, and losing time when missing !5 points!
// New ui  for pilot facecam and goodbye letter (with randomization on each reset, and added sprite animations) S-tier mod !5 points!
//This is an S-Tier mod, because I have added procedual redoric to my game, trying to make the player think more on the cost of war, you have to kill your army to win the game, are you winning?
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu , Play ]
}
let game = new Phaser.Game(config); 
let borderUISize = game.config.height / 15;
let bordePaddling = borderUISize / 3;
let keyFIRE, keyRESET, keyLEFT, keyRIGHT;