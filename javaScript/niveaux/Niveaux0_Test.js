class Niveaux0_Test extends Phaser.Scene {  // Copier Coller a modifier

    constructor (){
        super("Niveaux0_Test");   // Copier Coller a modifier
    }
    
    
    init(data){
        
    }
    
    
    preload (){
        this.load.image("Tiles_Test", 'assets/mondes/Tiles_Test.png');
        this.load.tilemapTiledJSON("map_Test", 'assets/mondes/Niveaux0_Test.json');
        
    }
    
    
    
    create (){
        
    //--- Variables : ----------------------------------------------------------
        this.nfruit = 0;
        this.test = false
  
    //--- Cursors : ----------------------------------------------------------
        this.cursors = this.input.keyboard.createCursorKeys();
    
        this.esc = this.input.keyboard.addKey('esc');
        this.A = this.input.keyboard.addKey('A');
        
        
        
        
        
    //--- Map Tiled : ----------------------------------------------------------
        this.map = this.add.tilemap('map_Test');
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
        this.antiGraviteLayer.setTileIndexCallback([483,484,485,520,521,522,557,558,559], ()=> { this.player.Gravite_Blanc(this.player) });
        this.graviteLayer.setTileIndexCallback([39,40,41,76,77,78,113,114,115], ()=> { this.player.Gravite_Vert(this.player) });
        this.graviteLayer.setTileIndexCallback([335,336,337,372,373,374,409,410,411], ()=> { this.player.Gravite_Bleu(this.player) });
        this.graviteLayer.setTileIndexCallback([187,188,189,223,225,226,261,262,263], ()=> { this.player.Gravite_Rouge(this.player) });
        
        
        
        
        
    //--- Player : ----------------------------------------------------------
        
        // start
        //this.player = new Perso(this, 300, 1800, 'snail');

        
        // ennemi
        this.player = new Perso(this, 3100, 1500, 'snail');

        
        
        
      // Cameras
        this.cameras.main.setSize(config.width, config.height);
        this.cameras.main.setBounds(0,0,7560,2160);
        this.cameras.main.startFollow(this.player,true,0.08,0.08);
        
        
        
        
        
    //--- Ennemis : ----------------------------------------------------------
        this.runner = new Runner(this, 4500, 1700, 'runner');
     
    
    //--- Objet :  ----------------------------------------------------------
        
      // StaticGroup :
        this.panneaux_dash = this.physics.add.staticGroup(); 
        this.panneaux_shield = this.physics.add.staticGroup();
        this.fruit = this.physics.add.staticGroup();
        
      // Dash
        this.panneaux_dash.create(2300,1864, 'panneaux_dash'); 
        
      // Shield
        this.panneaux_shield.create(2400,1864, 'panneaux_shield')
    
      // Fruit
        this.fruit.create(1700,1800, 'fruit');
        this.fruit.create(1800,1800, 'fruit');  
        this.fruit.create(1900,1800, 'fruit').setFlipY(true);;
    
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
        
        this.physics.add.collider(this.player, this.runner, this.Dommage, null, this);
     
        
        
        this.physics.add.overlap(this.player, this.fruit,  this.CollectFruits, null, this);
        this.physics.add.overlap(this.player, this.panneaux_dash, this.Dash, null, this);
        this.physics.add.overlap(this.player, this.panneaux_shield, this.Shield, null, this);
        this.physics.add.overlap(this.player, this.spaceShip, this.Sortie, null, this);
    
      // Ennemis
        this.physics.add.collider(this.runner,  this.collideLayer);
     
        
        
    //--- Debug  :  ----------------------------------------------------------
        this.pXT = this.add.text(30,30,(''), { fontSize: FontSize, fill: FontColor, strokeThickness: FontThisckness, stroke: FontColor }).setScrollFactor(0);
        this.pYT = this.add.text(30,60,(''), { fontSize: FontSize, fill: FontColor, strokeThickness: FontThisckness, stroke: FontColor }).setScrollFactor(0);
        this.ptestT = this.add.text(30,120,(''), { fontSize: FontSize, fill: FontColor, strokeThickness: FontThisckness, stroke: FontColor }).setScrollFactor(0);
        
        
    }// fin de Create
    
    
    
    
    
    update (){
        
    //--- Updates des Class  :  ----------------------------------------------------------
        this.player.update();
        
        this.runner.update(this.player.x, this.player.y);

        
    //--- Animations  :  ----------------------------------------------------------   
        this.inventaire.anims.play("inv" + this.player.inventaire);
        this.compteurDeFruit.anims.play("fruit"+this.nfruit);
        
        
        
        
        
    //--- Debug :  --------------------------------------------------------
        this.pXT.setText('X = ' + this.player.x);
        this.pYT.setText('Y = ' + this.player.y);
        this.ptestT.setText('Test = ' + this.test);
        
        
        
        
        
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
        if (this.player.invu == false && this.player.dashOn == false){
            this.player.Vie();
            this.cameras.main.shake(50, 0.02)
            this.barreDeVie.anims.play("vie" + this.player.hp);
        }
        
        if (this.player.dashOn == true){
            this.runner.Dead(this.runner);
        }
        
    }
    
    
    
    
    
    
    Dash (){
        this.player.Loot("dash");
    }
    Shield (){
        this.player.Loot("shield");
    }
    
    
    
    
    
    
    CollectFruits (player, fruit){
        this.nfruit = this.nfruit +1
        fruit.destroy(true, true);
        console.log('Joueur Loot Fruit : '+this.nfruit )
        
    }
    Sortie (player, spaceShip){
        this.scene.start("Map");
    
    }
    
}// fin de Class