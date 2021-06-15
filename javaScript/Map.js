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
        this.load.tilemapTiledJSON("map", 'assets/mondes/Niveaux0_Map.json');
    }
    create (){
        
        this.input.addPointer(3);
        
        console.log(this);
       
        if (this.save == 1) {
            
        }
        else {
            this.Fruit = [0,0,0,0,0,0,0];    
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
        this.tiles = this.map.addTilesetImage('OuterSnail_TileSet');
         
      // Layer 
        this.graviteLayer = this.map.createLayer('graviteLayer', this.tiles, 0, 0);
        this.collideLayer = this.map.createLayer('collideLayer', this.tiles, 0, 0);
        this.decoLayer = this.map.createLayer('decoLayer', this.tiles, 0, 0);
   
      // Collider
        this.collideLayer.setCollisionByExclusion(-1, true);
        
      // Overlap
        this.graviteLayer.setTileIndexCallback([200], ()=> { this.monde = 0, this.lvl = "Test" });
        
        this.graviteLayer.setTileIndexCallback([214], ()=> { this.monde = 1,this.lvl = 0 });
        this.graviteLayer.setTileIndexCallback([202], ()=> { this.monde = 1,this.lvl = 1 });
        this.graviteLayer.setTileIndexCallback([204], ()=> { this.monde = 1,this.lvl = 2 });
        this.graviteLayer.setTileIndexCallback([206], ()=> { this.monde = 1,this.lvl = 3 });
        this.graviteLayer.setTileIndexCallback([208], ()=> { this.monde = 1,this.lvl = 4 });
        this.graviteLayer.setTileIndexCallback([210], ()=> { this.monde = 1,this.lvl = 5 });
        this.graviteLayer.setTileIndexCallback([212], ()=> { this.monde = 1,this.lvl = 'boss' });
            
        
        
        
        
    //--- Player : ----------------------------------------------------------
        this.player = this.physics.add.sprite(700,1500, 'snail');

      // Cameras
        this.cameras.main.setSize(cameX, cameY);
        this.cameras.main.setBounds(0,0,7560,2160);
        this.cameras.main.startFollow(this.player,true,0.08,0.08);
        
      // Controle Mobile
        this.mobil = new Controle_mobil();
        this.mobil.Create(this);
        
        
    //--- UI :  ---------------------------------------------------------- 
        
        this.bg = this.physics.add.image(960,774, 'map_background').setScrollFactor(0,0);
        this.cdf = this.physics.add.sprite(960,1194, 'map_CDF').setScrollFactor(0,0);
        this.nt = this.physics.add.sprite(300,1112,'map_number').setScrollFactor(0,0);
        
        this.UiGroup = this.add.group();
            this.UiGroup.add(this.bg);
            this.UiGroup.add(this.cdf);
            this.UiGroup.add(this.nt);
        
        
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
            this.pYT.setText('Y = ' + this.player.y);
            this.pTT.setText('lvl = ' + this.lvl);
        }
        
        
        
        
        
    //--- Input  :  ----------------------------------------------------------
        this.droit = this.cursors.right.isDown || this.mobil.droit
        this.gauche = this.cursors.left.isDown || this.mobil.gauche
        this.haut = this.cursors.up.isDown || this.mobil.haut
        this.bas = this.cursors.down.isDown || this.mobil.bas

        this.space = this.cursors.space.isDown || this.mobil.s

        
        
        
        
        
    //--- Controls  :  ----------------------------------------------------------
      
        
      // Boost
        if (this.A.isDown || this.mobil.a){
            this.vitesseDeDeplacement = 700
        }
        else{
            this.vitesseDeDeplacement = 300
        }
        
        
        
        
        
        
      // Droit
        if(this.droit){ 
            this.player.setVelocityX(this.vitesseDeDeplacement);
            if (this.lasDirection == 1){
                this.player.anims.play("SR", true);
                this.lasDirection = 0
            }
            
        } 
        
      //  Gauche         
        else if (this.gauche){
            this.player.setVelocityX(-this.vitesseDeDeplacement);
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
             this.player.setVelocityY(-this.vitesseDeDeplacement);
        }
        
      // Bas
        else if (this.bas){
            this.player.setVelocityY(this.vitesseDeDeplacement);
        }
            
      //  Annulation 
        else {
            this.player.setVelocityY(0);
        }   
      // Espace
        if (this.space && this.lvl != 0){
            this.scene.start("Niveaux" + this.monde + "_"+ this.lvl, {fruit : this.Fruit, save : 1 });
        } 

        
 
        if (this.lvl == 0){
            if (this.bg.y <= 774){
                this.bg.setVelocityY(this.vitesseDeTravling);
                this.cdf.setVelocityY(this.vitesseDeTravling);
                this.nt.setVelocityY(this.vitesseDeTravling);
            }
            else{
                this.bg.setVelocityY(0);
                this.cdf.setVelocityY(0);
                this.nt.setVelocityY(0);
            }
        }
        else {
            if (this.bg.y >= 552){
                this.bg.setVelocityY(-this.vitesseDeTravling);
                this.cdf.setVelocityY(-this.vitesseDeTravling);
                this.nt.setVelocityY(-this.vitesseDeTravling);
                
                this.cdf.anims.play("cdf"+this.Fruit[this.lvl]);
                this.nt.anims.play("nt" + this.lvl);
            }
            else{
                this.bg.setVelocityY(0);
                this.cdf.setVelocityY(0);
                this.nt.setVelocityY(0);
            }
        }
        
        
        
        
        
        
        
     
    }// fin de Update

}