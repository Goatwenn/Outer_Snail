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
        
        this.droit = false;
        this.gauche = false;
        
        this.lastdirection = 2;
        
        this.Deplacement = 300;
        this.gravite = 0;
        
        this.debug = true;
        this.debugCouleur = '#FFF';
        this.debugSize = 22;
    
    //--- Cursors    
        this.cursors = this.input.keyboard.createCursorKeys();
        
    //--- Map Tiled
        this.map = this.add.tilemap('map');
        this.tiles = this.map.addTilesetImage('Tiles_Test');
        
            // Layer 
        this.gravLayer = this.map.createStaticLayer('gravLayer', this.tiles, 0, 0);
        this.botLayer = this.map.createStaticLayer('botLayer', this.tiles, 0, 0);
        this.redLayer = this.map.createStaticLayer('redLayer', this.tiles, 0, 0);
        this.blueLayer = this.map.createStaticLayer('blueLayer', this.tiles, 0, 0);
        this.greenLayer = this.map.createStaticLayer('greenLayer', this.tiles, 0, 0);
        this.midLayer = this.map.createStaticLayer('midLayer', this.tiles, 0, 0);
        
        
        
            //Collider
        this.midLayer.setCollisionByExclusion(-1, true);
        
            //Overlap
        
        this.gravLayer.setTileIndexCallback([482,483,484,519,520,521,556,557,558], ()=> {
            this.gravite = 0
        });
        
        this.greenLayer.setTileIndexCallback([38,39,40,75,76,77,112,113,11], ()=> {
            this.gravite = 1
        });
        
        this.blueLayer.setTileIndexCallback([334,335,336,371,372,373,408,409,410], ()=> {
            this.gravite = 2
        });
        
        this.redLayer.setTileIndexCallback([186,187,188,223,224,225,260,261,262], ()=> {
            this.gravite = 3
        });
        
        
    
    // Player
        this.player = this.physics.add.sprite(100,1800, 'snail');
        
    //--- Cameras  
        this.cameras.main.setSize(1920, 1080);
        this.cameras.main.setBounds(0,0,7560,2160);
        this.cameras.main.startFollow(this.player,true,0.08,0.08);
        
        
    //--- Collider & Overlap
        this.physics.add.collider(this.player, this.midLayer);
        
        this.physics.add.overlap(this.player, this.greenLayer);
        this.physics.add.overlap(this.player, this.redLayer);
        this.physics.add.overlap(this.player, this.blueLayer);
        this.physics.add.overlap(this.player, this.gravLayer);
        
        //this.physics.add.overlap(this.player, this.botLayer, this.AnimeJoueur, null, this);
          
          
     //--- Animations 
        this.anims.create({
            key: 'SL0',
            frames: this.anims.generateFrameNumbers('snail', { start: 1, end: 4 }),
            duration: 300,
        });
        
        this.anims.create({
            key: 'SR0',
            frames: this.anims.generateFrameNumbers('snail', { start: 5, end: 8 }),
            duration: 300,
        });
        
        this.anims.create({
            key: 'SL1',
            frames: this.anims.generateFrameNumbers('snail', { start: 19, end: 22 }),
            duration: 300,
        });
        
        this.anims.create({
            key: 'SR1',
            frames: this.anims.generateFrameNumbers('snail', { start: 23, end: 26 }),
            duration: 300,
        });
        
    
            
        
    //--- Debug Update
        this.pXT = this.add.text(30,830,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        this.pYT = this.add.text(30,860,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        this.gravT = this.add.text(30,890,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        
        this.droitT = this.add.text(30,940,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        this.gaucheT = this.add.text(30,970,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        this.lastdirectionT = this.add.text(30,1000,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        this.aniamtionT = this.add.text(30,1030,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
       
       
        
        
        
        
        
        
        
    }
    update (){
            
    //--- Debug Update
        if (this.debug == true){
            this.pXT.setText('X = ' + this.player.x);
            this.pYT.setText('Y = ' + this.player.y);
            this.gravT.setText('Grav = ' + this.gravite);
            
            this.droitT.setText('Droit = ' + this.droit);
            this.gaucheT.setText('Gauche = ' + this.gauche);
            this.lastdirectionT.setText('last direction = ' + this.lastdirection);
            this.aniamtionT.setText('animation = ' + this.snailAnimation);
            
           
        }
        
       
        
    //--- Controles
        
        let pad = Phaser.Input.Gamepad.Gamepad;

        if(this.input.gamepad.total === 0){
            return;
        }
        
        this.pad = this.input.gamepad.getPad(0)
        this.xAxis = this.pad ? this.pad.axes[0].getValue() : 0;
        this.yAxis = this.pad ? this.pad.axes[1].getValue() : 0;
        
        
        this.droit = this.cursors.right.isDown || this.xAxis > 0;
        this.gauche = this.cursors.left.isDown || this.xAxis < 0;
        
        this.space = this.cursors.space.isDown || this.pad.A;
        
    //--- Deplacement
        
        
        
        
        
        if (this.gravite == 1){
            this.player.setGravityY(0)
            this.player.setGravityX(300)
            
            
        if(this.gauche){this.player.setVelocityY(this.Deplacement)}
        if(this.droit){this.player.setVelocityY(-this.Deplacement)}
        if(!this.droit && !this.gauche){this.player.setVelocityY(0)}
        
        if(this.space){this.player.setVelocityX(-200)}
            
        }
        else if (this.gravite == 2){
            this.player.setGravityY(-300)
            this.player.setGravityX(0)
            
            
        if(this.gauche){this.player.setVelocityX(this.Deplacement)}
        if(this.droit){this.player.setVelocityX(-this.Deplacement)}
        if(!this.droit && !this.gauche){this.player.setVelocityX(0)}
        
        if(this.space){this.player.setVelocityY(200)}
            
        }
        else if (this.gravite == 3){
            this.player.setGravityY(0)
            this.player.setGravityX(-300)
                 
            
        if(this.gauche){this.player.setVelocityY(-this.Deplacement)}
        if(this.droit){this.player.setVelocityY(this.Deplacement)}
        if(!this.droit && !this.gauche){this.player.setVelocityY(0)}
        
        if(this.space){this.player.setVelocityX(200)}
            
        }
        else{
            this.player.setGravityY(300)
            this.player.setGravityX(0)
            
            
        if(this.gauche){this.player.setVelocityX(-this.Deplacement)}
        if(this.droit){this.player.setVelocityX(this.Deplacement)}
        if(!this.droit && !this.gauche){this.player.setVelocityX(0)}
        
        if(this.space){this.player.setVelocityY(-200)}
        }
        
        
        //--- Animations
        
       // this.player.anims.play(this.snailAnimation);
        
        
        this.snailAnimation ='S'+this.animDirection + this.gravite
        
        
        if (this.droit && this.lastdirection == 1){
            this.animDirection = 'R'
            this.lastdirection = 2
        }
        
        if (this.gauche && this.lastdirection == 2){
            this.animDirection = 'L'
            this.lastdirection = 1
        } 
        
        
        
        
         
    }

    
   
}