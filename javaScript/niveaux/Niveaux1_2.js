class Niveaux1_2 extends Phaser.Scene {  // Copier Coller a modifier

    constructor (){
        super("Niveaux1_2");   // Copier Coller a modifier
    }
    
    
    init(data){
        this.Fruit = data.fruit
        this.save = data.save
    }
    
    
    preload (){
    //--- Load du TileSet : ----------------------------------------------------------
        
        this.load.tilemapTiledJSON("Niveaux1_2", 'assets/mondes/Niveaux1_2.json');
    }
    
    
    
    create (){
        
        this.input.addPointer(3);
        
        console.log(this);
        this.nfruit = 0;
        
    //--- Variables : ----------------------------------------------------------
        
        this.nfruit = 0;
        this.test = false
  
        
        
    //--- Cursors : ----------------------------------------------------------
        
        this.cursors = this.input.keyboard.createCursorKeys();
    
        this.esc = this.input.keyboard.addKey('esc');
        this.A = this.input.keyboard.addKey('A');
        
        
        
    //--- Paralaxe : ----------------------------------------------------------
        
        if (!debug){
            this.add.image(4000, 1080, 'BG_S').setScrollFactor(0.75,1);
        }
        

        
    //--- Map Tiled : ----------------------------------------------------------
        
        this.map = this.add.tilemap('Niveaux1_2');
        this.tiles = this.map.addTilesetImage('OuterSnail_TileSet');
         
      // Layer 
        if (debug){
            this.backgroundLayer = this.map.createLayer('backgroundLayer', this.tiles, 0, 0);
        }
        
        this.antiGraviteLayer = this.map.createLayer('antiGraviteLayer', this.tiles, 0, 0);
        this.graviteLayer = this.map.createLayer('graviteLayer', this.tiles, 0, 0);
        this.collideLayer = this.map.createLayer('collideLayer', this.tiles, 0, 0);
        this.DLayer = this.map.createLayer('DLayer', this.tiles, 0, 0);
        this.bordureLayer = this.map.createLayer('bordureLayer', this.tiles, 0, 0);
   
      // Collider
        this.collideLayer.setCollisionByExclusion(-1, true);
        
      // Overlap
        this.antiGraviteLayer.setTileIndexCallback([Blanc], ()=> { this.player.Gravite('blanc') });
        this.graviteLayer.setTileIndexCallback([Vert], ()=> { this.player.Gravite('vert') });
        this.graviteLayer.setTileIndexCallback([Bleu], ()=> { this.player.Gravite('bleu') });
        this.graviteLayer.setTileIndexCallback([Rouge], ()=> { this.player.Gravite('rouge') });
        
        
        
    //--- Player : ----------------------------------------------------------
        
        this.player = new Perso(this, 486, 1730, 'snail').setDepth(1);
        
        
      // Cameras
        this.cameras.main.setSize(cameX, cameY);
        this.cameras.main.setBounds(0,0,7560,2160);
        
        if(controle_mobiles){
            this.cameras.main.startFollow(this.player,true,0.08,0.08, 0, -100);
        }
        else {
             this.cameras.main.startFollow(this.player,true,0.08,0.08);
        }
     
    
   
      // Controle Mobile
        this.mobil = new Controle_mobil();
        this.mobil.Create(this);
        
     
    //--- Ennemis : ----------------------------------------------------------
        
        // this.ennemi_x = new Thrower(this, x, y, 'thrower').setDepth(1);
        // this.ennemi_x = new Runner(this, x, y, 'runner', grav).setDepth(1);
        
        this.ennemi_1= new Runner(this, 6029, 671, 'runner',1).setDepth(1);
        this.ennemi_2 = new Flyer(this, 2390, 600, 'flyer', 900 ).setDepth(1);

        
        this.ennemiGroup = this.add.group();  //this.ennemiGroup.add(this.ennemi_X);
        
            this.ennemiGroup.add(this.ennemi_1);
            this.ennemiGroup.add(this.ennemi_2);
          
        
        
    //--- Objet :  ----------------------------------------------------------
    
      // Group :
        this.dash = this.physics.add.staticGroup(); 
        this.shield = this.physics.add.staticGroup();
        this.fruit = this.physics.add.staticGroup();
        
      // Dash   --  this.dash.create(x,y, 'dash').angle = x ; 
        
        
      // Shield   --   this.shield.create(x,y, 'shield').angle = x ; 
        this.shield.create(3375,565, 'shield').angle = - 75; 
        this.shield.create(5265,300, 'shield').angle = 168 ; 
    
      // Fruit ---          X - Y            .setFlipY(true/false)
        this.fruit.create(3600,1271, 'fruit').setAngle(-90);;
        this.fruit.create(6400,620, 'fruit');  
        this.fruit.create(1900,900, 'fruit').setAngle(90);
    
      // Sortie
        this.spaceShip = this.physics.add.sprite(400,315, 'spaceship');
        this.spaceShip.setSize(500,126)
                
        
   
    //--- Ui :  ----------------------------------------------------------
        
        if (controle_mobiles){
              
          // Barre de vie
            this.barreDeVie = this.physics.add.sprite(200, 100, 'vie').setScrollFactor(0,0);

          // Inventaire
            this.inventaire = this.physics.add.sprite(1820,100, 'inventaire').setScrollFactor(0,0);   

          // Cmpteur De Fruit
            this.compteurDeFruit = this.physics.add.sprite(1650,100, 'CDF').setScrollFactor(0,0);

        }
        else{
              
          // Barre de vie
            this.barreDeVie = this.physics.add.sprite(200, 1000, 'vie').setScrollFactor(0,0);

          // Inventaire
            this.inventaire = this.physics.add.sprite(1820,1000, 'inventaire').setScrollFactor(0,0);   

          // Cmpteur De Fruit
            this.compteurDeFruit = this.physics.add.sprite(1650,1000, 'CDF').setScrollFactor(0,0);

        }
    
    //--- Collider & Overlap :  ----------------------------------------------------------
        
      // Player
        this.physics.add.collider(this.player, this.collideLayer);
        
        this.physics.add.overlap(this.player, this.graviteLayer);
        this.physics.add.overlap(this.player, this.antiGraviteLayer); 
        
        this.physics.add.overlap(this.player, this.dash, this.Loot_Dash, null, this);
        this.physics.add.overlap(this.player, this.shield, this.Loot_Shield, null, this);
        this.physics.add.overlap(this.player, this.fruit, this.CollectFruits, null, this);
        
        this.physics.add.overlap(this.player, this.spaceShip, this.Sortie, null, this);
    
      // Ennemis
        this.physics.add.collider(this.ennemiGroup,  this.collideLayer);
        this.physics.add.collider(this.player,this.ennemiGroup, this.Dommage, null, this);
        
        
        
    //--- Debug  :  ----------------------------------------------------------
        
        this.pXT = this.add.text(30,30,(''), { fontSize: FontSize, fill: FontColor, strokeThickness: FontThisckness, stroke: FontColor }).setScrollFactor(0);
        this.pYT = this.add.text(30,60,(''), { fontSize: FontSize, fill: FontColor, strokeThickness: FontThisckness, stroke: FontColor }).setScrollFactor(0);
        this.pTT = this.add.text(30,120,(''), { fontSize: FontSize, fill: FontColor, strokeThickness: FontThisckness, stroke: FontColor }).setScrollFactor(0);
        
        
        
    }// fin de Create
    
    update (){
    
    //--- Updates des Class  :  ----------------------------------------------------------
        
      // Player
        this.player.Update();
        
      // Ennemis
        var children = this.ennemiGroup.getChildren();
        for (var i = 0; i < children.length; i++){
            children[i].Update();
        }
        
      
    
    //--- Animations  :  ----------------------------------------------------------   
        
        this.inventaire.anims.play("inv" + this.player.inventaire);
        this.compteurDeFruit.anims.play("CDF"+this.nfruit);
        
        
        
    //--- Debug :  --------------------------------------------------------
        
        if (debug){
            this.pXT.setText('X = ' + this.player.x);
            this.pYT.setText('Y = ' + this.player.y);
            this.pTT.setText('test = ' + this.player.bouclier_Timer);
        }
        
        
        
        
   //--- Input  :  ----------------------------------------------------------
        
        this.droit = this.cursors.right.isDown || this.mobil.droit
        this.gauche = this.cursors.left.isDown || this.mobil.gauche
        this.haut = this.cursors.up.isDown || this.mobil.haut
        this.bas = this.cursors.down.isDown || this.mobil.bas

        this.space = this.cursors.space.isDown || this.mobil.s
   
        
        
        
    //--- Controls  :  ----------------------------------------------------------
        
        this.player.Deplacement(
            this.droit,
            this.gauche,
            this.haut,
            this.bas,
            this.space
        );
        
        if(this.A.isDown || this.mobil.a){
            this.player.Pouvoir();
        }
        
        
        
    }// fin de Update

    
    Dommage(player,ennemi){
        this.player.Vie(ennemi);  
    }
    
    
    
    Loot_Dash(){
        this.player.Loot('dash');
    }
    Loot_Shield(){
        this.player.Loot('shield');
    }
    Loot_Fruit(){
        this.player.Loot('fruit');
    }
    
    
    
    CollectFruits (player, fruit){
        this.nfruit = this.nfruit +1
        fruit.destroy(true, true);
        console.log('Joueur Loot Fruit : '+this.nfruit )
        
    }
    
    
    Sortie (player, spaceShip){
        if (this.Fruit[2] < this.nfruit){
            this.Fruit[2] = this.nfruit
        }
        this.scene.start("Map", {fruit : this.Fruit, save : 1 });
    
    }
    
}// fin de Class