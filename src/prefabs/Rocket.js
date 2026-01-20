//todo: game.input.mousePointer.x to move rocket
// todo: game.input.activePointer.isDown to fire rocket

class Rocket extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame)

        scene.add.existing(this)
        this.isFiring = false;
        this.moveSpeed = 4;
        this.sfxRocket = scene.sound.add('sfx-shot')
       //Used to get a reference to the delayclock
        this.dClock = 0;
    }
    update(){
        if(!this.isFiring)
        {
            if(game.input.mousePointer.x >= borderUISize + this.width + 254 && game.input.mousePointer.x <= game.config.width - borderUISize - this.width){
                this.x = game.input.mousePointer.x;
            }
        }
    //fire button
        if(game.input.activePointer.isDown&& !this.isFiring)
        {
        this.isFiring = true;
        this.sfxRocket.play();
        }

    //if fired move up
        if(this.isFiring && this.y >= borderUISize *3 +bordePaddling)
        {
        this.y -= this.moveSpeed;
        }
        //reset on miss
         if(this.y <= borderUISize *3 + bordePaddling)
        {
            this.dClock.delay -= 5000; //penalize clock 1 second on miss
        this.isFiring = false;
        this.y = game.config.height - borderUISize - bordePaddling;
        }
    }

    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - bordePaddling;
    }
}
