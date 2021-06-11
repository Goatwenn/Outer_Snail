class Niveaux1_1 extends Phaser.Scene {  // Copier Coller a modifier

    constructor (){
        super("Niveaux1_1");   // Copier Coller a modifier
    }
    
    
    init(data){
        this.Fruit = data.fruit
        this.save = data.save
    }
    
    
    preload (){
        
     //--- Load du TileSet : ----------------------------------------------------------
        this.load.image("Tiles_Test", 'assets/mondes/Tiles_Test.png');
        this.load.tilemapTiledJSON("map1_1", 'assets/mondes/Niveaux1_1.json');
        
    }
    
    
    create (){
        
    //--- Variables : ----------------------------------------------------------
        this.nfruit = 0;
    
        
        
        
    //--- Paralaxe : ----------------------------------------------------------
        if (!debug){
            this.add.image(4000, 1080, 'plan4').setScrollFactor(0.20,1);
            this.add.image(4000, 1080, 'plan3').setScrollFactor(0.30,1);
        }
        
        
        
        
        
    //--- Cursors : ----------------------------------------------------------
        this.cursors = this.input.keyboard.createCursorKeys();
    
        this.esc = this.input.keyboard.addKey('esc');
        this.A = this.input.keyboard.addKey('A');
        
        
        
        
        
    //--- Map Tiled : ----------------------------------------------------------
        this.map = this.add.tilemap('map1_1');
        this.tiles = this.map.addTilesetImage('OuterSnail_TileSet');
         
      // Layer 
        this.backgroundLayer = this.map.createLayer('backgroundLayer', this.tiles, 0, 0).setDepth(-2);
        this.antiGraviteLayer = this.map.createLayer('antiGraviteLayer', this.tiles, 0, 0);
        this.graviteLayer = this.map.createLayer('graviteLayer', this.tiles, 0, 0);
        this.collideLayer = this.map.createLayer('collideLayer', this.tiles, 0, 0);
        this.decoLayer = this.map.createLayer('decoLayer', this.tiles, 0, 0);
   
      // Collider
        this.collideLayer.setCollisionByExclusion(-1, true);
        
      // Overlap
        this.antiGraviteLayer.setTileIndexCallback([Blanc], ()=> { this.player.Gravite_Blanc(this.player) });
        this.graviteLayer.setTileIndexCallback([Vert], ()=> { this.player.Gravite_Vert(this.player) });
        this.graviteLayer.setTileIndexCallback([Bleu], ()=> { this.player.Gravite_Bleu(this.player) });
        this.graviteLayer.setTileIndexCallback([Rouge], ()=> { this.player.Gravite_Rouge(this.player) });
        
        
        
        
        
    //--- Player : ----------------------------------------------------------
        this.player = new Perso(this, 300, 1800, 'snail');

      // Cameras
        this.cameras.main.setSize(config.width, config.height);
        this.cameras.main.setBounds(0,0,7560,2160);
        this.cameras.main.startFollow(this.player,true,0.08,0.08);
        
        
        
        
        
    //--- Ennemis : ----------------------------------------------------------
        this.runner = new Runner(this, 2500, 1700, 'runner');
     
        
        
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
        this.pTT = this.add.text(30,120,(''), { fontSize: FontSize, fill: FontColor, strokeThickness: FontThisckness, stroke: FontColor }).setScrollFactor(0);
        
        
    }// fin de Create
    
    
    
    
    
    update (){
        
    //--- Updates des Class  :  ----------------------------------------------------------
        this.player.update();
        this.runner.update();
        
        
        
        
        
        
    //--- Animations  :  ----------------------------------------------------------   
        this.inventaire.anims.play("inv" + this.player.inventaire);
        this.compteurDeFruit.anims.play("fruit"+this.nfruit);
        
        
        
        
        
    //--- Debug :  ---------------------------------------------------------
        if (debug == true){
            this.pXT.setText('X = ' + this.player.x);
            this.pYT.setText('Y = ' + this.player.y);
            this.pTT.setText('Y = ' + this.Fruit);
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
        if (this.Fruit[0] < this.nfruit){
            this.Fruit[0] = this.nfruit
        }
        this.scene.start("Map", {fruit : this.Fruit, save : 1 });
    
    }
    
}// fin de Class