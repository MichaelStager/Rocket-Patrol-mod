class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }
    
    create() {
        
        //I think we could change the 640 and 480 to config heights for scaleablity
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)

        
          // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + bordePaddling * 2, 'spaceship', 0, 20).setOrigin(0, 0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + bordePaddling * 4, 'spaceship', 0, 10).setOrigin(0, 0)
        //add pilot sprite for facecam
        this.bgBox =this.add.rectangle(borderUISize, game.config.height - 244, 254, 255 -(borderUISize + bordePaddling), 0xFF0000).setOrigin(0, 0);
        this.curPilot = this.add.image(borderUISize +127, game.config.height - 135, 'pilot1').setOrigin(0.5,0.5);
         //add a letter background in the space above face cam (Goodbye letter) todo:change sprite name from wires to letterbg
        this.letterBacking = this.add.rectangle(borderUISize, borderUISize + bordePaddling+(borderUISize*2), 254, 120, 0xFF0000).setOrigin(0,0);
         this.letterbg = this.add.image(borderUISize, borderUISize + bordePaddling+(borderUISize*2), 'wires').setOrigin(0,0);
        
        //array of pilot sprites for random selection and array of goodbye letters.
        this.pilotSprites = ['pilot1', 'pilot2', 'pilot3'];
        this.goodbyeLetters = [
            "Dear yoshi Im dead because of you...",
            "FOR THE LORD!!!!!!!! I LEAVE MY SOUL IN HIS NAME!!!",
            "Dear Mom, I died in a rocket ship accident. Tell Dad I love him."
        ];
        
        this.add.rectangle(0, borderUISize + bordePaddling, game.config.width, borderUISize * 2, 0xff0000).setOrigin(0, 0);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)

      //GoodBye text
      this.add.text(borderUISize +20, borderUISize + bordePaddling-3 , "GOODBYE LETTER", {
   fontSize: '32px',
  color: '#000000',
  wordWrap: { width: 214, useAdvancedWrap: true }
  });
       
        //Boarder for Facecam of pilot sprite
        this.add.rectangle(borderUISize, game.config.height - 254, 254, 10, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(borderUISize+254, borderUISize+10 , 10, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(borderUISize, bordePaddling+ borderUISize*2 +22, 254, 10, 0xFFFFFF).setOrigin(0, 0);
        
        // add rocket (p1)
        this.p1rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - bordePaddling, "rocket").setOrigin(0.5, 0)

        
        
        
        
        
         
        
        //define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#f9f9f9',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.gameOver = false;
        this.scoreLeft = this.add.text((borderUISize + bordePaddling)*11, borderUISize + bordePaddling * 2, this.p1Score, scoreConfig);
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        this.curPilot.goodbyeLetter = this.add.text(40, 130, "Hello", {
   fontSize: '20px',
  color: '#ffffff',
  wordWrap: { width: 254, useAdvancedWrap: true }
  });
        this.setRandomPilot();
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
            this.pilotDeath();
        }
        if (this.checkCollision(this.p1rocket, this.ship02)) {
            this.p1rocket.reset();
            this.shipExplode(this.ship02);
            this.pilotDeath();
        }
        if (this.checkCollision(this.p1rocket, this.ship01)) {
            this.p1rocket.reset();
            this.shipExplode(this.ship01);
            this.pilotDeath();
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
                    this.curPilot.setTintFill(0xFFFFFF);
                }
                else{
                    rec.setFillStyle(0xFF0000)
                    this.curPilot.clearTint();
                }
            }, null, this);
    }
    }
    }
    // make an "animation" of the pilot falling down when ship explodes
    pilotDeath()
    {
        this.tweens.add({
            targets: this.curPilot,
            y: game.config.height + 100,
            duration: 1000,
            ease: 'Power1',
            onComplete: () => {
      // put them back AFTER the fall finishes
      this.curPilot.setY(game.config.height - 135);
        this.setRandomPilot();
        }
        });
        //flicker the bg box while pilot falls
        this.flickerBG(this.bgBox);
        this.slideLetter();
        
    }

    setRandomPilot()
    {
        //TO DO: set this.curPilot to a random pilot from an array of pilot images and set its goodbye letter
        let randIndex = Math.floor(Math.random() * this.pilotSprites.length);
        
        this.curPilot.setTexture(this.pilotSprites[randIndex]);
        this.curPilot.goodbyeLetter.setText(this.goodbyeLetters[randIndex]);
    }
    slideLetter()
    {
        //TO DO: make the goodbye letter slide in from the left side of the facecam box
        this.tweens.add({
            targets: this.curPilot.goodbyeLetter,
            x: borderUISize - 300,
            duration: 1000,
            ease: 'Power1',
            onComplete: () => {
                this.curPilot.goodbyeLetter.setX(40)//after sliding in, slide back out after 2 seconds
            }      
        });
        this.tweens.add({
            targets: this.letterbg,
            x: borderUISize - 300,
            duration: 1000,
            ease: 'Power1',
            onComplete: () => {
                this.letterbg.setX(borderUISize)//after sliding in, slide back out after 2 seconds
            }      
        });
            
    }
}

