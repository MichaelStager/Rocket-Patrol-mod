class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        //I think we could change the 640 and 480 to config heights for scaleablity
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
        this.add.rectangle(0, borderUISize + bordePaddling, game.config.width, borderUISize * 2, 0x00ff00).setOrigin(0, 0);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)

        //Boarder for Facecam of pilot sprite
        this.add.rectangle(borderUISize, game.config.height - 254, 254, 10, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(borderUISize+254, game.config.height - 254, 10, 254, 0xFFFFFF).setOrigin(0, 0);
        
        //a red sqaure that we will use to flicker between red and black later
        this.bgBox =this.add.rectangle(borderUISize, game.config.height - 244, 254, 244, 0xFF0000).setOrigin(0, 0); 
        // add rocket (p1)
        this.p1rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - bordePaddling, "rocket").setOrigin(0.5, 0)

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + bordePaddling * 2, 'spaceship', 0, 20).setOrigin(0, 0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + bordePaddling * 4, 'spaceship', 0, 10).setOrigin(0, 0)
        //define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.gameOver = false;
        this.scoreLeft = this.add.text(borderUISize + bordePaddling, borderUISize + bordePaddling * 2, this.p1Score, scoreConfig);
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        this.scene.start("menuScene")
}
        this.starfield.tilePositionX -= 4;
        if(!this.gameOver){
        this.p1rocket.update();
        this.ship01.update()               // update spaceships (x3)
        this.ship02.update()
        this.ship03.update()
        }
        if (this.checkCollision(this.p1rocket, this.ship03)) {
            this.p1rocket.reset();
            this.shipExplode(this.ship03);
            this.flickerBG(this.bgBox);
        }
        if (this.checkCollision(this.p1rocket, this.ship02)) {
            this.p1rocket.reset();
            this.shipExplode(this.ship02);
            this.flickerBG(this.bgBox);
        }
        if (this.checkCollision(this.p1rocket, this.ship01)) {
            this.p1rocket.reset();
            this.shipExplode(this.ship01);
            this.flickerBG(this.bgBox);
        }
    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
            return true;
        }
        else { return false }
    }

    shipExplode(ship) {
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        })

        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx-explosion');
        //call flicker function to flicker the red bg box
        
    }

    //Flicker the background rec between red and black when ship explodes really fast by changing bg color
    flickerBG(rec){ {
        for(let i=0; i<60; i++){
            this.time.delayedCall(10*i, () => {
                if(i%2==0){
                    rec.setFillStyle(0x000000)
                }
                else{
                    rec.setFillStyle(0xFF0000)
                }
            }, null, this);
    }
    }
    }
}