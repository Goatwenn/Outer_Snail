class Niveaux0_Blank extends Phaser.Scene {  // Copier Coller a modifier

    constructor (){
        super("Niveaux0_Blank");   // Copier Coller a modifier
    }
    
    
    init(data){
        
    }
    
    
    preload (){
        this.load.image("Tiles_Test", 'assets/mondes/Tiles_Test.png');
        this.load.tilemapTiledJSON("Map", 'assets/mondes/Niveaux0_Blank.json');
        
    }
    
    
    
    create (){
        
    //--- Variables : ----------------------------------------------------------
        this.cdf = 0;
        
    
        
        
        
    //--- Paralaxe : ----------------------------------------------------------
        if (debug == false){
            this.add.image(4000, 1080, 'plan4').setScrollFactor(0.20,1);
            this.add.image(4000, 1080, 'plan3').setScrollFactor(0.30,1);
        }
        
        
        
        
        
    //--- Cursors : ----------------------------------------------------------
        this.cursors = this.input.keyboard.createCursorKeys();
    
        this.esc = this.input.keyboard.addKey('esc');
        this.A = this.input.keyboard.addKey('A');
        
        
        
        
        
    //--- Map Tiled : ----------------------------------------------------------
        this.map = this.add.tilemap('Map');
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
        this.antiGraviteLayer.setTileIndexCallback([482,483,484,519,520,521,556,557,558], ()=> { this.player.Gravite_Blanc(this.player) });
        this.graviteLayer.setTileIndexCallback([38,39,40,75,76,77,112,113,11], ()=> { this.player.Gravite_Vert(this.player) });
        this.graviteLayer.setTileIndexCallback([334,335,336,371,372,373,408,409,410], ()=> { this.player.Gravite_Bleu(this.player) });
        this.graviteLayer.setTileIndexCallback([186,187,188,223,224,225,260,261,262], ()=> { this.player.Gravite_Rouge(this.player) });
        
        
        
        
        
    //--- Player : ----------------------------------------------------------
        this.player = new Perso(this, 300, 1800, 'snail');

      // Cameras
        this.cameras.main.setSize(config.width, config.height);
        this.cameras.main.setBounds(0,0,7560,2160);
        this.cameras.main.startFollow(this.player,true,0.08,0.08);
        
        
        
        
        
    //--- Ennemis : ----------------------------------------------------------
        this.ennemi_1 = new Runner(this, 2500, 1700, 'runner');
     
        
        
        
    
    //--- Objet :  ----------------------------------------------------------
        
      // StaticGroup :
        this.panneaux_dash = this.physics.add.staticGroup(); 
        this.panneaux_shield = this.physics.add.staticGroup();
        this.fruit = this.physics.add.staticGroup();
        
      // Dash
        this.panneaux_dash.create(970,1755, 'panneaux_dash'); 
        
      // Shield
        this.panneaux_shield.create(600,1864, 'panneaux_shield')
    
      // Fruit
        this.fruit.create(2562,1600, 'fruit');
        this.fruit.create(460,1860, 'fruit');  
        this.fruit.create(4430,1377, 'fruit').setFlipY(true);;
    
      // Sortie
        this.spaceShip = this.physics.add.sprite(7100,1540, 'spaceShip');
        this.spaceShip.setSize(500,126)
        
        
        
        
        
    //--- Ui :  ----------------------------------------------------------
        
      // Barre de vie
        this.barreDeVie = this.physics.add.sprite(200, 1000, 'vie').setScrollFactor(0,0);
      
      // Inventaire
        this.inventaire = this.physics.add.sprite(1820,1000, 'inventaire').setScrollFactor(0,0);   
      
      // Cmpteur De Fruit
        this.compteurDeFruit = this.physics.add.sprite(1650,1000, 'compteurDeFruit').setScrollFactor(0,0);
    
        
        
        
        
    //--- Collider & Overlap :  ----------------------------------------------------------
        
      // Player
        this.physics.add.collider(this.player, this.collideLayer);
        
        this.physics.add.overlap(this.player, this.graviteLayer);
        this.physics.add.overlap(this.player, this.antiGraviteLayer); 
        
        this.physics.add.collider(this.player, this.ennemi_1, this.Dommage, null, this);
        
        this.physics.add.overlap(this.player, this.fruit,  this.CollectFruits, null, this);
        this.physics.add.overlap(this.player, this.panneaux_dash, this.Dash, null, this);
        this.physics.add.overlap(this.player, this.panneaux_shield, this.Shield, null, this);
        this.physics.add.overlap(this.player, this.spaceShip, this.Sortie, null, this);
    
      // Ennemis
        this.physics.add.collider(this.ennemi_1,  this.collideLayer);
        
     

        
        
        
    //--- Debug  :  ----------------------------------------------------------
        this.pXT = this.add.text(30,30,(''), { fontSize: FontSize, fill: FontColor, strokeThickness: FontThisckness, stroke: FontColor }).setScrollFactor(0);
        this.pYT = this.add.text(30,60,(''), { fontSize: FontSize, fill: FontColor, strokeThickness: FontThisckness, stroke: FontColor }).setScrollFactor(0);
        
    }// fin de Create
    
    
    
    
    
    update (){
        
    //--- Updates des Class  :  ----------------------------------------------------------
        this.player.update();
        this.ennemi_1.update(this.player.x, this.player.y);
        
        
        
        
        
    //--- Animations  :  ----------------------------------------------------------   
        this.inventaire.anims.play("inv" + this.player.inventaire);
        this.compteurDeFruit.anims.play("fruit"+this.cdf);
        
        
        
        
        
    //--- Debug 
        if (debug == true){
            this.pXT.setText('X = ' + this.player.x);
            this.pYT.setText('Y = ' + this.player.y);
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
            this.player.Droit(this.player);  
        } 
        
      //  Gauche         
        else if (this.gauche){
            this.player.Gauche(this.player);
        }   
        
      //  Annulation      
        else if(!this.haut && !this.bas){
            this.player.Stop(this.player);
        }    
        
        
        
        
      // Haut       
        if (this.haut){
            this.player.Haut(this.player);
        }
        
      // Bas
        else if (this.bas){
            this.player.Bas(this.player);
        }
        
      //  Annulation 
        else if(!this.droit && !this.gauche){
            this.player.Stop(this.player);
        }   
 
        
        
        
      //  Jump 
        if (this.space){
            this.player.Jump(this.player);
        }
      //  Annulation 
        else{
            this.player.noJump(this.player);
        }

        
        
      //  Touche A 
        if(this.A.isDown){
            this.player.Pouvoir(this.player);
        }
     
    }// fin de Update

    
    
    
    
    Dommage(){
        if (this.player.invu == false){
            this.player.Vie();
            this.cameras.main.shake(50, 0.02)
            this.barreDeVie.anims.play("vie" + this.player.hp);
        }
    }
    
    
    
    
    
    
    Dash (){
        this.player.Loot("dash");
    }
    Shield (){
        this.player.Loot("shield");
    }
    
    
    
    
    
    
    CollectFruits (player, fruit){
        this.cdf = this.cdf+1
        fruit.destroy(true, true);
        
    }
    Sortie (player, spaceShip){
        player.destroy(true, true);
    }
    
}// fin de Class