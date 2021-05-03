class zoneTest extends Phaser.Scene {  // Copier Coller a modifier

    constructor (){
        super("zoneTest");   // Copier Coller a modifier
    }
    init(data){
        
    }
    preload (){
        this.load.image("Tiles_Test", 'assets/mondes/Tiles_Test.png');
        this.load.tilemapTiledJSON("map", 'assets/mondes/mondeTest.json');
        
        this.load.image("snail", 'assets/snail.png');
        
    }
    create (){
    //--- Variables
        
        this.droit = false;
        this.gauche = false;
       
        this.Deplacement = 300;
        
        this.debug = true;
        this.debugGrav = 0;
        this.debugCouleur = '#FFF';
        this.debugSize = 22;
    
    //--- Cursors    
        this.cursors = this.input.keyboard.createCursorKeys();
        
    //--- Map Tiled
        this.map = this.add.tilemap('map');
        this.tiles = this.map.addTilesetImage('Tiles_Test');
        
            // Layer 
        this.botLayer = this.map.createStaticLayer('botLayer', this.tiles, 0, 0);
        this.redLayer = this.map.createStaticLayer('redLayer', this.tiles, 0, 0);
        this.blueLayer = this.map.createStaticLayer('blueLayer', this.tiles, 0, 0);
        this.greenLayer = this.map.createStaticLayer('greenLayer', this.tiles, 0, 0);
        this.midLayer = this.map.createStaticLayer('midLayer', this.tiles, 0, 0);
        
       
        
            //Collider
        this.midLayer.setCollisionByExclusion(-1, true);
        this.greenLayer.setCollisionByExclusion(-1, true);
        this.redLayer.setCollisionByExclusion(-1, true);
        this.blueLayer.setCollisionByExclusion(-1, true);
            
    // Player
        this.player = this.physics.add.sprite(100,1800, 'snail');
        
    //--- Cameras  
        this.cameras.main.setSize(1920, 1080);
        this.cameras.main.setBounds(0,0,7560,2160);
        this.cameras.main.startFollow(this.player,true,0.08,0.08);
        
        
    //--- Collider & Overlap
        this.physics.add.collider(this.player, this.midLayer,this.NullGrav, null, this);
        this.physics.add.collider(this.player, this.greenLayer, this.GreenGrav, null, this);
        this.physics.add.collider(this.player, this.redLayer, this.RedGrav, null, this);
        this.physics.add.collider(this.player, this.blueLayer, this.BlueGrav, null, this);
        
    //--- Debug Update
        this.pXT = this.add.text(30,830,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        this.pYT = this.add.text(30,860,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        this.gravT = this.add.text(30,890,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        
        this.droitT = this.add.text(30,940,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        this.gaucheT = this.add.text(30,970,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        this.hautT = this.add.text(30,1000,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
        this.basT = this.add.text(30,1030,(''), { fontSize: this.debugSize, fill: this.debugCouleur }).setScrollFactor(0);
       
        
        
    }
    update (){
            
    //--- Debug Update
        if (this.debug == true){
            this.pXT.setText('X = ' + this.player.x);
            this.pYT.setText('Y = ' + this.player.y);
            this.gravT.setText('Y = ' + this.debugGrav);
            
            this.droitT.setText('Droit = ' + this.droit);
            this.gaucheT.setText('Gauche = ' + this.gauche);
            this.hautT.setText('Haut = ' + this.haut);
            this.basT.setText('Bas = ' + this.bas);
           
        }
        

        
        
        
        
        
        
        
        
    //--- Controles
        
         let pad = Phaser.Input.Gamepad.Gamepad;

        if(this.input.gamepad.total){
            this.pad = this.input.gamepad.getPad(0)
            this.xAxis = this.pad ? this.pad.axes[0].getValue() : 0;
            this.yAxis = this.pad ? this.pad.axes[1].getValue() : 0;
        }
        
        this.droit = this.cursors.right.isDown || this.xAxis > 0;
        this.gauche = this.cursors.left.isDown || this.xAxis < 0;
        this.haut = this.cursors.up.isDown || this.yAxis < 0 ;
        this.bas = this.cursors.down.isDown || this.yAxis > 0 ;
        
        this.space = this.cursors.space.isDown;
        
    //--- Deplacement
        
        
        if (this.debugGrav == 1){
            this.player.setGravityY(0)
            this.player.setGravityX(300)
            
            
        if(this.bas){this.player.setVelocityY(this.Deplacement)}
        if(this.haut){this.player.setVelocityY(-this.Deplacement)}
        if(!this.haut && !this.bas){this.player.setVelocityY(0)}
        
        if(this.space){this.player.setVelocityX(-200)}
            
        }
        else if (this.debugGrav == 2){
            this.player.setGravityY(-300)
            this.player.setGravityX(0)
            
            
        if(this.droit){this.player.setVelocityX(this.Deplacement)}
        if(this.gauche){this.player.setVelocityX(-this.Deplacement)}
        if(!this.gauche && !this.droit){this.player.setVelocityX(0)}
        
        if(this.space){this.player.setVelocityY(200)}
            
        }
        else if (this.debugGrav == 3){
            this.player.setGravityY(0)
            this.player.setGravityX(-300)
                 
            
        if(this.haut){this.player.setVelocityY(-this.Deplacement)}
        if(this.bas){this.player.setVelocityY(this.Deplacement)}
        if(!this.bas && !this.haut){this.player.setVelocityY(0)}
        
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
        
    }
    
    
    NullGrav (player,){
        
        this.debugGrav = 0;
    } 
    
    GreenGrav (player,){
        
        this.debugGrav = 1;
    }
    
    BlueGrav (player,){
        
        this.debugGrav = 2;
    }
    
    RedGrav (player,){
        
        this.debugGrav = 3;
    }
}