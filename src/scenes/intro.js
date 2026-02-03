class Intro extends Phaser.Scene {
    constructor() {
        super("intro")
    }

    preload() {
         this.load.image("rocket", "./assets/rocket.png")
        this.load.image("spaceship2", "./assets/spaceship2.png")
        this.load.image("spaceship", "./assets/spaceship.png")
        this.load.image("starfield", "./assets/starfield2.png")
        this.load.image("pilot1", "./assets/pilot1.png")
        this.load.image("pilot2", "./assets/pilot2.png")
        this.load.image("pilot3", "./assets/pilot3.png")
        this.load.image("wires", "./assets/WiresBeta.png")
        this.load.audio("sfx-select", "./assets/sfx-select.wav")
        this.load.audio("sfx-explosion", "./assets/sfx-explosion.wav")
        this.load.audio("sfx-shot", "./assets/sfx-shot.wav")
        this.load.audio("bgm","./assets/bgm.wav")
        this.load.spritesheet("explosion", "./assets/explosion.png", { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 })
    

    }

    create() {
        this.bgm = this.sound.play("bgm",{loop:true})
        this.introText = 'We have run out of Rockets,\n Perpare for your final mission \n for your lord...\n Press any key to continue'
        //make background pink for test
        this.cameras.main.setBackgroundColor('#000000');
        //The speakers box and speaker image
        
        this.bgBoxSpeaker =this.add.rectangle(255/2 +50, game.config.height/2, 255, 255, 0xFF0000).setOrigin(0.5, 0.5);
        this.speaker = this.add.image(255/2 +50, game.config.height/2, 'pilot1').setOrigin(0.5,0.5);

        //the player
        this.bgBoxPlayer =this.add.rectangle((game.config.width/2)+255/2 +50, game.config.height/2, 255, 255 , 0xFFFFF0).setOrigin(0.5, 0.5);
        this.player = this.add.image(game.config.width/2 + 255/2+50, game.config.height/2, 'pilot1').setOrigin(0.5,0.5);

        //Text intro (beta right now just saying hello this is text)
        this.introTextDisplay = this.add.text(game.config.width/2, game.config.height -50,'', { fontFamily: 'Courier', fontSize: '28px', color: '#ffffff', align: 'center' }).setOrigin(0.5);
        this.typewriterEffect();

        //Black rect to overlay to add a fade-in effect
        this.fadeRect = this.add.rectangle(game.config.width/2,game.config.height/2,game.config.width,game.config.height,0x000000 )
        }
    

    update() {
        //click to start
        this.input.keyboard.on('keydown', () => {
            this.scene.start('menuScene')
        });

        //fades the screen 
        this.fadeRect.alpha -=.01

    }
    // might be good to change this later so you pass in the text you want to display, and where to display it (text, textDisplayObject)
    typewriterEffect() {
    let index = 0;
    const text = this.introText;
    const speed = 50;
    
    this.time.addEvent({
        delay: speed,
        callback: () => {
            this.introTextDisplay.setText(this.introTextDisplay.text + text[index]);
            index++;
        },
        repeat: text.length - 1
    });
}

    
}
