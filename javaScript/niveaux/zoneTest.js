class zoneTest extends Phaser.Scene {  // Copier Coller a modifier

    constructor (){
        super("zoneTest");   // Copier Coller a modifier
    }
    init(data){
        
    }
    preload (){
        this.load.image("Tiles_Test", 'assets/mondes/Tiles_Test.png');
        this.load.tilemapTiledJSON("map", 'assets/mondes/mondeTest.json');
        
    }
    create (){
        
    //--- Variables
        
      // Initialiser
        this.droit = false;
        this.gauche = false;
        this.haut = false;
        this.bas = false;
        
        this.sol = false;
        this.dsaut = false;
        this.mur = false;
        
        this.gravite = 0;
        this.lastdirection = 2;
        this.invincible = false;
        this.invincibleTimer = 0;
        this.invFruit = 0;
        this.invSpell = 0
    
        
      // Modulable
        this.playerHP = 3;
        
        this.Deplacement = 300;
        this.Jump = 350
        this.gravitePuissence = 400;
        this.manette = false;
        
      // Debug
        this.debug = false;
        this.debugCouleur = '#000';
        this.debugSize = 22;
        this.Rn = 0;
        this.RnTimer = 0;
        

    //--- Paralaxe
        if (this.debug == false){
            this.add.image(4000, 1080, 'plan4').setScrollFactor(0.20,1);
            this.add.image(4000, 1080, 'plan3').setScrollFactor(0.30,1);
        }
        
        
        
    //--- Cursors    
        this.cursors = this.input.keyboard.createCursorKeys();
    
        this.esc = this.input.keyboard.addKey('esc');
        this.A = this.input.keyboard.addKey('A');
        
        
    //--- Map Tiled
        this.map = this.add.tilemap('map');
        this.tiles = this.map.addTilesetImage('Tiles_Test');
         
      // Layer 
        this.backgroundLayer = this.map.createStaticLayer('backgroundLayer', this.tiles, 0, 0).setDepth(-2);
        this.antiGraviteLayer = this.map.createStaticLayer('antiGraviteLayer', this.tiles, 0, 0);
        this.graviteLayer = this.map.createStaticLayer('graviteLayer', this.tiles, 0, 0);
        this.collideLayer = this.map.createStaticLayer('collideLayer', this.tiles, 0, 0);
        this.decoLayer = this.map.createStaticLayer('decoLayer', this.tiles, 0, 0);
   
      // Collider
        this.collideLayer.setCollisionByExclusion(-1, true);
        
      // Overlap
        this.graviteLayer.setTileIndexCallback([482,483,484,519,520,521,556,557,558], ()=> { this.gravite = 0 });
        this.graviteLayer.setTileIndexCallback([38,39,40,75,76,77,112,113,11], ()=> { this.gravite = 1 });
        this.graviteLayer.setTileIndexCallback([334,335,336,371,372,373,408,409,410], ()=> { this.gravite = 2 });
        this.graviteLayer.setTileIndexCallback([186,187,188,223,224,225,260,261,262], ()=> { this.gravite = 3 });
        
        
        
    //--- Player 
        
        this.player = new Perso(this, 300, 1550, 'snail');
        
        this.ennemi_1 = new Runner(this, 700, 1550, 'ennemi');
        
        this.cameras.main.setSize(config.width, config.height);
        this.cameras.main.setBounds(0,0,7560,2160);
        this.cameras.main.startFollow(this.player,true,0.08,0.08);
    
        
        
    //--- Collider & Overlap
        this.physics.add.collider(this.player, this.collideLayer);
        this.physics.add.collider(this.ennemi_1, this.collideLayer);
        
        this.physics.add.overlap(this.player, this.graviteLayer);

    //--- Animations 
        
      // Player
        this.anims.create({
            key: 'SL',
            frames: this.anims.generateFrameNumbers('snail', { start: 1, end: 4 }),
            duration: 300,
        });
        
        this.anims.create({
            key: 'SR',
            frames: this.anims.generateFrameNumbers('snail', { start: 5, end: 8 }),
            duration: 300,
        });
        
    /*    
      // Barre de Vie
        this.anims.create({
            key: 'vie3',
            frames: [ { key: 'vie', frame: 0. } ],
        });
        
        this.anims.create({
            key: 'vie2',
            frames: [ { key: 'vie', frame: 1. } ],
        });
        
        this.anims.create({
            key: 'vie1',
            frames: this.anims.generateFrameNumbers('vie', { start: 2, end: 3 }),
            frameRate: 4,
            repeat: 10000,
        });
        
        this.anims.create({
            key: 'vie_0',
            frames: [ { key: 'vie', frame: 4. } ],
        });
        
      // Compteur de Fruit
        this.anims.create({
            key: 'fruit0',
            frames: [ { key: 'CDF', frame: 0. } ],
        });
        
        this.anims.create({
            key: 'fruit1',
            frames: [ { key: 'CDF', frame: 1. } ],
        });
        
        this.anims.create({
            key: 'fruit2',
            frames: [ { key: 'CDF', frame: 2. } ],
        });
        
        this.anims.create({
            key: 'fruit3',
            frames: [ { key: 'CDF', frame: 3. } ],
        });
        
        
      // Inventaire
        this.anims.create({
            key: 'inv0',
            frames: [ { key: 'inventaire', frame: 0. } ],
        });
        
        this.anims.create({
            key: 'inv1',
            frames: [ { key: 'inventaire', frame: 1. } ],
        });
        
        this.anims.create({
            key: 'inv2',
            frames: [ { key: 'inventaire', frame: 2. } ],
        });
        
       
   
         */   
        
    //--- Debug Update
        this.playerCoordonéeT = this.add.text(330,20,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        this.playerHPT = this.add.text(330,50,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        
        this.invincibleT = this.add.text(330,110,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        this.invincibleTimerT = this.add.text(330,140,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        
        this.droitT = this.add.text(30,20,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        this.gaucheT = this.add.text(30,50,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        this.hautT = this.add.text(30,80,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        this.basT = this.add.text(30,110,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        
        this.solT = this.add.text(30,140,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        this.dsautT = this.add.text(30,170,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        
        this.lastdirectionT = this.add.text(30,200,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        this.gravT = this.add.text(30,230,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
       
       
       
        
        
        
        
        
        
        
    }
    update (){
        
        this.player.update();
        this.ennemi_1.update(this.player.x, this.player.y);
          
    //--- Debug Update
        if (this.debug == true){
            //this.playerCoordonéeT.setText('X/Y= ' + this.player.x +','+ this.player.y);
            //this.playerHPT.setText('Hp = ' + this.playerHP);
            
            this.invincibleT.setText('Inv = ' + this.invincible);
            this.invincibleTimerT.setText('Temps = ' + this.invincibleTimer);
            
            this.droitT.setText('Droit = ' + this.droit);
            this.gaucheT.setText('Gauche = ' + this.gauche);
            this.hautT.setText('Haut = ' + this.haut);
            this.basT.setText('Bas = ' + this.bas);
            
            this.solT.setText('au sol = ' + this.sol);
            this.dsautT.setText('D-saut = ' + this.dsaut);
            
            this.lastdirectionT.setText('last direction = ' + this.lastdirection);
            this.gravT.setText('Grav = ' + this.gravite);
        }
        
      
        
            
    //--- Controles
       
        
        let pad = Phaser.Input.Gamepad.Gamepad;

        if (this.manette){
            if(this.input.gamepad.total == 0){
                return;
            }
            
            this.pad = this.input.gamepad.getPad(0)
            this.xAxis = this.pad ? this.pad.axes[0].getValue() : 0;
            this.yAxis = this.pad ? this.pad.axes[1].getValue() : 0;
     
            this.droit = this.cursors.right.isDown || this.xAxis > 0;
            this.gauche = this.cursors.left.isDown || this.xAxis < 0;
            this.haut = this.cursors.up.isDown || this.yAxis < 0;
            this.bas = this.cursors.down.isDown || this.yAxis > 0;
            
            this.space = this.cursors.space.isDown || this.pad.A;
            
        }
        else { 
            this.droit = this.cursors.right.isDown
            this.gauche = this.cursors.left.isDown
            this.haut = this.cursors.up.isDown
            this.bas = this.cursors.down.isDown
            
            this.space = this.cursors.space.isDown
            this.echap = this.esc.isDown
        }
        

        
        if(this.droit){
            this.player.Droit(this.player);
        }
        else if (this.gauche){
            this.player.Gauche(this.player);
        }
        else if(!this.haut && !this.bas){
            this.player.Stop(this.player);
        }    
        
        if (this.haut){
            this.player.Haut(this.player);
        }
        else if (this.bas){
            this.player.Bas(this.player);
        }
        else if(!this.droit && !this.gauche){
            this.player.Stop(this.player);
        }   
        


        
        if (this.space){
            this.player.Jump(this.player);
        }
        else{
            this.player.noJump(this.player);
        }
        
        //
        
        
        
        if (this.gravite == 3){
            
            this.player.setFlipX(true);
            this.player.setAngle(90);
            
            this.player.Gravite_Rouge(this.player);
        }
        else if (this.gravite == 2){
            
            this.player.setFlipX(true);
            this.player.setAngle(180);
            
            this.player.Gravite_Bleu(this.player);
        }
        else if (this.gravite == 1){
            
            this.player.setFlipX(false);
            this.player.setAngle(-90);
        
            this.player.Gravite_Vert(this.player);
        }
        else {
            
            this.player.setFlipX(false);
            this.player.setAngle(0);
            
            this.player.Gravite_Blanc(this.player);
        }
        
        
        
        if(this.A.isDown){
            this.player.Dash(this.player);
        }
        
        
        
        
    //--- Saut
        /*
        if (this.space && this.sol){
            this.sol = false
            if (this.sautAxis == true){
                this.player.setVelocityY(this.saut)
            }
            else{
                this.player.setVelocityX(this.saut)
            }
        }
        
        if (!this.space && !this.sol && this.sdsaut){
            this.dsaut = true
        }
        
        if (this.space && !this.sol && this.dsaut){
            this.dsaut = false
            this.sdsaut = false
            if (this.sautAxis == true){
                this.player.setVelocityY(this.saut)
            }
            else{
                this.player.setVelocityX(this.saut)
            }
        }
        
        
    */    
    //--- Animations
   
        if (this.gravite == 0 || this.gravite == 2){
            if (this.droit && this.lastdirection == 1){
                this.player.anims.play("SR");
                this.lastdirection = 2
            }
            if (this.gauche && this.lastdirection == 2){
                this.player.anims.play("SL");
                this.lastdirection = 1
            } 
        }
        
       if (this.gravite == 1 || this.gravite == 3){
            if (this.haut && this.lastdirection == 1){
                this.player.anims.play("SR");
                this.lastdirection = 2
            }
            if (this.bas && this.lastdirection == 2){
                this.player.anims.play("SL");
                this.lastdirection = 1
            } 
        } 
        
   
   
        
        
        
        
        
    }// fin de Update

    
    
    
   
}// fin de Class