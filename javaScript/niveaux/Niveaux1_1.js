class Niveaux1_1 extends Phaser.Scene {  // Copier Coller a modifier

    constructor (){
        super("Niveaux1_1");   // Copier Coller a modifier
    }
    
    
    init(data){
        
    }
    
    
    preload (){
        this.load.image("Tiles_Test", 'assets/mondes/Tiles_Test.png');
        this.load.tilemapTiledJSON("map", 'assets/mondes/Niveaux1_1.json');
        
    }
    
    
    
    create (){
        
        this.nbfruit = 0
        
    //--- Paralaxe
        if (debug == false){
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
        this.antiGraviteLayer.setTileIndexCallback([482,483,484,519,520,521,556,557,558], ()=> { this.player.Gravite_Blanc(this.player) });
        this.graviteLayer.setTileIndexCallback([38,39,40,75,76,77,112,113,11], ()=> { this.player.Gravite_Vert(this.player) });
        this.graviteLayer.setTileIndexCallback([334,335,336,371,372,373,408,409,410], ()=> { this.player.Gravite_Bleu(this.player) });
        this.graviteLayer.setTileIndexCallback([186,187,188,223,224,225,260,261,262], ()=> { this.player.Gravite_Rouge(this.player) });
        
        
        
    //--- Player 
        
        this.player = new Perso(this, 300, 1800, 'snail');
        
        
        this.ennemi_1 = new Runner(this, 2500, 1700, 'runner');
     
        this.cameras.main.setSize(CameraX, CameraY);
        this.cameras.main.setBounds(0,0,7560,2160);
        this.cameras.main.startFollow(this.player,true,0.08,0.08);
    
        this.barreDeVie = this.physics.add.sprite(200, 1000, 'vie').setScrollFactor(0,0);
        
        this.inventaire = this.physics.add.sprite(1820,1000, 'inventaire').setScrollFactor(0,0);   
        
        this.compteurDeFruit = this.physics.add.sprite(1650,1000, 'compteurDeFruit').setScrollFactor(0,0);
       
        this.fruit = this.physics.add.staticGroup();
        this.fruit.create(2562,1600, 'fruit');
        this.fruit.create(3623,945, 'fruit');
        this.fruit.create(4430,1377, 'fruit').setFlipY(true);;
        
        
        this.panneaux_dash = this.physics.add.staticGroup(); 
        this.panneaux_dash.create(970,1755, 'panneaux_dash'); 
        
        this.panneaux_shield = this.physics.add.staticGroup();
        this.panneaux_shield.create(600,1864, 'panneaux_shield');
        
        this.spaceShip = this.physics.add.sprite(7100,1540, 'spaceShip');
        this.spaceShip.setSize(500,126)
        
        this.win = this.physics.add.image(-960, -540, 'win').setScrollFactor(0,0);
        
        
    //--- Collider & Overlap
        this.physics.add.collider(this.player, this.collideLayer);
        
        this.physics.add.overlap(this.player, this.panneaux_dash, this.Dash, null, this);
        this.physics.add.overlap(this.player, this.panneaux_shield, this.Shield, null, this);
        
        this.physics.add.collider(this.ennemi_1,  this.collideLayer);
        
        this.physics.add.collider(this.player, this.ennemi_1, this.Dommage, null, this);
        this.physics.add.overlap(this.player, this.graviteLayer);
        this.physics.add.overlap(this.player, this.antiGraviteLayer); 
        
        this.physics.add.overlap(this.fruit, this.player, this.collectFruits);
        this.physics.add.overlap(this.player, this.spaceShip, this.sortieDeNiveau);
        
    //--- Debug 
        this.pXT = this.add.text(30,30,(''), { fontSize: FontSize, fill: FontColor, strokeThickness: FontThisckness, stroke: FontColor }).setScrollFactor(0);
        this.pYT = this.add.text(30,60,(''), { fontSize: FontSize, fill: FontColor, strokeThickness: FontThisckness, stroke: FontColor }).setScrollFactor(0);
        
    }
    
    
    update (){
        
        this.player.update();
        this.ennemi_1.update(this.player.x, this.player.y);
        
        this.inventaire.anims.play("inv" + this.player.inventaire);
        this.compteurDeFruit.anims.play("fruit");
        
    //--- Debug 
        if (debug == true){
            this.pXT.setText('X = ' + this.player.x);
            this.pYT.setText('Y = ' + this.player.y);
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
    
    collectFruits (player, fruit){
        this.nbfruit = this.nbfruit + 1
        fruit.destroy(true, true);
        
    }
    
    sortieDeNiveau (player, spaceShip)
    {
        this.win.x = 960
        this.win.y = 540
    }
    
}// fin de Class