class PressScreen extends Phaser.Scene
{
    constructor() {
        super('pressScreen')
    }

 create()
 {
    this.add.text(this.game.config.width/2, this.game.config.height/2,"Press anyKey to contuine")
 }

 update()
 {
    this.input.keyboard.on("keydown", () => {
        this.scene.start("intro")
    })
 }
    
}