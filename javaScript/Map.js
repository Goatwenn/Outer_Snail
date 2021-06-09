class Map extends Phaser.Scene {  // Copier Coller a modifier

    constructor (){
        super("Map");   // Copier Coller a modifier
    }
    init(data){
        this.Fruit = data.fruit
        this.save = data.save
    }
    preload (){
    //--- Load du TileSet : ----------------------------------------------------------
        this.load.image("Tiles_Test", 'assets/mondes/Tiles_Test.png');
        this.load.tilemapTiledJSON("map", 'assets/mondes/Niveaux0_Map.json');
        
        
        
    }
    create (){
       
        if (this.save == 1) {
            
        }
        else {
            this.Fruit = [0,0,0,0,0];    
        }
        
        this.lasDirection = 0;
        
        this.monde = 0;
        
        this.vitesseDeTravling = 400;
        this.lvl = 0
        
    //--- Cursors : ----------------------------------------------------------
        this.cursors = this.input.keyboard.createCursorKeys();
    
        this.esc = this.input.keyboard.addKey('esc');
        this.A = this.input.keyboard.addKey('A');
        
        
        
        
        
        
    //--- Map Tiled : ----------------------------------------------------------
        this.map = this.add.tilemap('map');
        this.tiles = this.map.addTilesetImage('Tiles_Test');
         
      // Layer 
        this.backgroundLayer = this.map.createLayer('backgroundLayer', this.tiles, 0, 0).setDepth(-2);
        this.antiGraviteLayer = this.map.createLayer('antiGraviteLayer', this.tiles, 0, 0);
        this.graviteLayer = this.map.createLayer('graviteLayer', this.tiles, 0, 0);
        this.collideLayer = this.map.createLayer('collideLayer', this.tiles, 0, 0);
        this.decoLayer = this.map.createLayer('decoLayer', this.tiles, 0, 0);
   
      // Collider
        this.collideLayer.setCollisionByExclusion(-1, true);
        
      // Overlap
        this.graviteLayer.setTileIndexCallback([237], ()=> { this.monde = 0, this.lvl = "Test" });
        
        this.graviteLayer.setTileIndexCallback([87], ()=> { this.monde = 1,this.lvl = 0 });
        this.graviteLayer.setTileIndexCallback([94], ()=> { this.monde = 1,this.lvl = 1 });
        this.graviteLayer.setTileIndexCallback([97], ()=> { this.monde = 1,this.lvl = 2 });
        this.graviteLayer.setTileIndexCallback([101], ()=> { this.monde = 1,this.lvl = 3 });
        this.graviteLayer.setTileIndexCallback([103], ()=> { this.monde = 1,this.lvl = 4 });
        this.graviteLayer.setTileIndexCallback([106], ()=> { this.monde = 1,this.lvl = 5 });
        this.graviteLayer.setTileIndexCallback([108], ()=> { this.monde = 1,this.lvl = 6 });
            
        
        
        
        
    //--- Player : ----------------------------------------------------------
        this.player = this.physics.add.sprite(700,1500, 'snail');

      // Cameras
        this.cameras.main.setSize(config.width, config.height);
        this.cameras.main.setBounds(0,0,7560,2160);
        this.cameras.main.startFollow(this.player,true,0.08,0.08);
        
        
        
        
    //--- UI :  ---------------------------------------------------------- 
        
        this.ui = this.physics.add.image(960,774, 'UI').setScrollFactor(0,0);
        this.cdf = this.physics.add.sprite(960,1194, 'cdf').setScrollFactor(0,0);
        
        
        
        
        
        
        
    //--- Collider & Overlap :  ----------------------------------------------------------
        
      // Player
        this.physics.add.collider(this.player, this.collideLayer);
        
        this.physics.add.overlap(this.player, this.graviteLayer);
        this.physics.add.overlap(this.player, this.antiGraviteLayer); 
        
        
    //--- Debug  :  ----------------------------------------------------------
        this.pXT = this.add.text(30,30,(''), { fontSize: FontSize, fill: FontColor, strokeThickness: FontThisckness, stroke: FontColor }).setScrollFactor(0);
        this.pYT = this.add.text(30,60,(''), { fontSize: FontSize, fill: FontColor, strokeThickness: FontThisckness, stroke: FontColor }).setScrollFactor(0);
        this.pTT = this.add.text(30,120,(''), { fontSize: FontSize, fill: FontColor, strokeThickness: FontThisckness, stroke: FontColor }).setScrollFactor(0);
        
    }
    update(){
    //--- Debug :  ---------------------------------------------------------
        if (debug == true){
            this.pXT.setText('X = ' + this.player.x);
            this.pYT.setText('Y = ' + this.ui.y);
            this.pTT.setText('lvl = ' + this.Fruit);
        }
        
        
        
        
        
    //--- Input  :  ----------------------------------------------------------
        this.droit = this.cursors.right.isDown
        this.gauche = this.cursors.left.isDown
        this.haut = this.cursors.up.isDown
        this.bas = this.cursors.down.isDown

        this.space = this.cursors.space.isDown
        this.echap = this.esc.isDown
        
        
        
        
        
    //--- Controls  :  ----------------------------------------------------------
        
      // Droit
        if(this.droit){ 
            this.player.setVelocityX(300);
            if (this.lasDirection == 1){
                this.player.anims.play("SR", true);
                this.lasDirection = 0
            }
            
        } 
        
      //  Gauche         
        else if (this.gauche){
            this.player.setVelocityX(-300);
            if (this.lasDirection == 0){
                this.player.anims.play("SL", true);
                this.lasDirection = 1
            }
        }   
        
      //  Annulation      
        else {
            this.player.setVelocityX(0);
        }    
        
        
        
        
      // Haut       
        if (this.haut){
             this.player.setVelocityY(-300);
        }
        
      // Bas
        else if (this.bas){
            this.player.setVelocityY(300);
        }
            
      //  Annulation 
        else {
            this.player.setVelocityY(0);
        }   
      // Espace
        if (this.cursors.space.isDown && this.lvl != 0){
            this.scene.start("Niveaux" + this.monde + "_"+ this.lvl, {fruit : this.Fruit, save : 1 });
        } 

        
        
        
        
 
        if (this.lvl == 0){
            if (this.ui.y <= 774){
                this.ui.setVelocityY(this.vitesseDeTravling);
                this.cdf.setVelocityY(this.vitesseDeTravling);
            }
            else{
                this.ui.setVelocityY(0);
                this.cdf.setVelocityY(0);
            }
        }
        else {
            if (this.ui.y >= 552){
                this.ui.setVelocityY(-this.vitesseDeTravling);
                this.cdf.setVelocityY(-this.vitesseDeTravling);
                this.cdf.anims.play("cdf"+this.Fruit[this.lvl-1]);
            }
            else{
                this.ui.setVelocityY(0);
                this.cdf.setVelocityY(0);
            }
        }
        
        
        
        
        
        
        
     
    }// fin de Update

}