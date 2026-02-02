/*
* Michael Stager
* Project name: Goodbye letter
* I have been working on this project for last few weeks so its hard to calculate, I would say like 10-15 hours minimum. 

//Mods I have implemented so far:
* Timer display !3 points!
* Created and added my own music  !1 point!
*  mouse control for rocket and firing !5 points!
* Created a new ship thats faster, more score and new sprite !5 points
* Time increase when hitting a spaceship, and losing time when missing !5 points!
* New ui for pilot facecam and goodbye letter (with randomization on each reset, and added sprite animations) S-tier mod !5 points!
* This is an S-Tier mod, because I have added procedual redoric to my game, trying to make the player think more on the cost of war, you have to kill your army to win the game, are you winning?
* Complete reskin s-Tier mod (change background, layout , and added an intro scene) !5 points!
* There might be some other mods I did but there is no point 
*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ PressScreen, Intro,Menu, , Play]
}
let game = new Phaser.Game(config); 
let borderUISize = game.config.height / 15;
let bordePaddling = borderUISize / 3;
let keyFIRE, keyRESET, keyLEFT, keyRIGHT;