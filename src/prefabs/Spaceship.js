class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue,speedValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = speedValue
        
        
    }
    

    update() {
        this.x -= this.moveSpeed;

        if(this.x <=0 - this.width +254){
            this.x = game.config.width;
        }
    }
    reset() {
        this.x = game.config.width;
    }
}