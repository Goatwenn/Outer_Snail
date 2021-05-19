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
        this.manette = true;
        
      // Debug
        this.debug = true;
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
        this.antiGraviteLayer.setTileIndexCallback([482,483,484,519,520,521,556,557,558], ()=> { this.gravite = 0 });
        this.graviteLayer.setTileIndexCallback([38,39,40,75,76,77,112,113,11], ()=> { this.gravite = 1 });
        this.graviteLayer.setTileIndexCallback([334,335,336,371,372,373,408,409,410], ()=> { this.gravite = 2 });
        this.graviteLayer.setTileIndexCallback([186,187,188,223,224,225,260,261,262], ()=> { this.gravite = 3 });
        
        
        
    //--- PhysiqueGroupe 
        this.PhyGroup = this.physics.add.staticGroup();
        this.PhyGroup.create(-960,-540, 'menu').setScrollFactor(0,0);
     
    
    //--- Player
        this.player = this.physics.add.sprite(140,1550, 'snail');
        this.player.setSize(54,54);
        
      // HitBox        
        this.playerHitBox = this.physics.add.sprite(this.player.x,this.player.y, 'hitbox');
        this.playerHitBox.setSize(108,54);
        
      // Cameras  
        this.cameras.main.setSize(1920, 1080);
        this.cameras.main.setBounds(0,0,7560,2160);
        this.cameras.main.startFollow(this.player,true,0.08,0.08);
        

    //--- Ennemit   
        this.ennemi = this.physics.add.sprite(500,1593, 'ennemi');
        this.ennemi.setGravityY(this.gravitePuissence)
        
    
    //--- Barre de Vie    
        this.barreDeVie = this.physics.add.sprite(1720,1000, 'vie').setScrollFactor(0,0);      
        
        
    //--- Inventaire    
        this.inventaire = this.physics.add.sprite(80,1000, 'inventaire').setScrollFactor(0,0);
        
        
    //--- Compteur de Fruit    
        this.CDF = this.physics.add.sprite(256,1000, 'CDF').setScrollFactor(0,0);  
        
      
        this.fruit = this.physics.add.group ()
        
        this.fruit.create(500,1593, 'fruit');
        this.fruit.create(560,1593, 'fruit');
        this.fruit.create(620,1593, 'fruit');
   
        
    //--- Debug BackGround
        if (this.debug == true){
            this.add.image(960,540, 'debug_BG').setScrollFactor(0,0);  
        }
        
        
    //--- Collider & Overlap
        this.physics.add.collider(this.player, this.collideLayer, this.AuSol, null, this);
        this.physics.add.overlap(this.player, this.graviteLayer);
        this.physics.add.overlap(this.player, this.antiGraviteLayer);
        
        this.physics.add.overlap(this.fruit, this.player, this.Getfruit);
        
        this.physics.add.collider(this.ennemi, this.collideLayer);
        this.physics.add.overlap(this.ennemi, this.playerHitBox, this.Dommage, null, this);
        

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
            
    //--- Debug Update
        if (this.debug == true){
            this.playerCoordonéeT.setText('X/Y= ' + this.player.x +','+ this.player.y);
            this.playerHPT.setText('Hp = ' + this.playerHP);
            
            this.invincibleT.setText('Inv = ' + this.invincible);
            this.invincibleTimerT.setText('Temps = ' + this.invincibleTimer);
            
            this.droitT.setText('Droit = ' + this.droit);
            this.gaucheT.setText('Gauche = ' + this.gauche);
            this.hautT.setText('Haut = ' + this.haut);
            this.basT.setText('Bas = ' + this.bas);
            
            this.solT.setText('au sol = ' + this.sol);
            this.dsautT.setText('D-saut = ' + this.dsaut);
            
            this.lastdirectionT.setText('last direction = ' + this.lastdirection);
            this.gravT.setText('Grav = ' + this.invFruit);
        }
        
        
   
    //--- Import  
         this.RnTimer = this.RnTimer + 1
        
        if (this.RnTimer >= 50){
            this.Rn = Phaser.Math.Between(0, 3)
            this.RnTimer = 0
        }
        
        this.commende = new mfe(this.player, this.playerHP, this.ennemi, this.Rn);
        
        
        this.commende.iA_ennemi();
        
        
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
  

        
        
//--- Deplacement
        
    //--- Hitbox
        this.playerHitBox.x = this.player.x
        this.playerHitBox.y = this.player.y
        
    //--- Vert
        if (this.gravite == 1){
            this.player.setGravityY(0)
            this.player.setGravityX(this.gravitePuissence)
            this.player.setAngle(-90);
            //this.cameras.main.rotation = 1.57
            this.player.setFlipX(false);
    
            this.saut = (-this.Jump)
            this.sautAxis = false
            
            if(this.bas){this.player.setVelocityY(this.Deplacement)}
            if(this.haut){this.player.setVelocityY(-this.Deplacement)}
            if(!this.haut && !this.bas){this.player.setVelocityY(0)}
         
            
        }
    //--- Bleu
        else if (this.gravite == 2){
            this.player.setGravityY(-this.gravitePuissence)
            this.player.setGravityX(0)
            this.player.setAngle(-180);
            //this.cameras.main.rotation = 3.14
            this.player.setFlipX(true);
            
            this.saut = (this.Jump)
            this.sautAxis = true
            
            if(this.droit){this.player.setVelocityX(this.Deplacement)}
            if(this.gauche){this.player.setVelocityX(-this.Deplacement)}
            if(!this.gauche && !this.droit){this.player.setVelocityX(0)}
          
        }
    //--- Rouge
        else if (this.gravite == 3){
            this.player.setGravityY(0)
            this.player.setGravityX(-this.gravitePuissence)
            this.player.setAngle(90);
            //this.cameras.main.rotation = -1.57
            this.player.setFlipX(true);
            
            this.saut = (this.Jump)
            this.sautAxis = false
            
            if(this.haut){this.player.setVelocityY(-this.Deplacement)}
            if(this.bas){this.player.setVelocityY(this.Deplacement)}
            if(!this.bas && !this.haut){this.player.setVelocityY(0)}
           
        }
    //--- Normale
        else{
            this.player.setGravityY(this.gravitePuissence)
            this.player.setGravityX(0)
            this.player.setAngle(0);
            //this.cameras.main.rotation = 0
            this.player.setFlipX(false);
            
            this.saut = (-this.Jump)
            this.sautAxis = true
            
            if(this.gauche){this.player.setVelocityX(-this.Deplacement)}
            if(this.droit){this.player.setVelocityX(this.Deplacement)}
            if(!this.droit && !this.gauche){this.player.setVelocityX(0)}
        
        }
        

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
        
    //--- Compteur de fruit 
        this.CDF.anims.play("fruit" +this.invFruit, true)
        
        
    //--- Inventaire
        this.inventaire.anims.play("inv" +this.invSpell, true)
        
        
    //--- Barre de Vie
        if(this.player.y >= 2500 || this.player.y <= -250 || this.player.x >= 8000 || this.player.x <= -200){
            this.playerHP = 0
        }
        
        if (this.playerHP == 0){
            this.commende.mort();
            this.playerHP = 3
        }
        
        
        if (this.invincible == true){
            this.invincibleTimer = this.invincibleTimer + 1
            if(this.invincibleTimer == 50){
                this.invincible = false
                this.invincibleTimer = 0
            }
                
        }
    
        this.barreDeVie.anims.play("vie"+ this.playerHP, true)
        

        
    //--- Pause
        if(this.echap){
            this.pause = true
        }
        
        if (this.pause){
            this.PhyGroup.x = 960
        }
        
        
        
        
        
        
    }// fin de Update

    AuSol (player, collideLayer){
        
        if (this.gravite == 0){
            if(this.player.body.blocked.left){
                return
            }
            else if (this.player.body.blocked.right){
                return
            }
            else if (this.player.body.blocked.up){
                return
            }
            else{
                this.sol = true
                this.sdsaut = true
                this.dsaut = false 
                
            }
        }
        
        if (this.gravite == 1){
            if(this.player.body.blocked.down){
                return
            }
            else if (this.player.body.blocked.left){
                return
            }
            else if (this.player.body.blocked.up){
                return
            }
            else{
                this.sol = true
                this.sdsaut = true 
                this.dsaut = false
            }
        }
        
        if (this.gravite == 2){
            if(this.player.body.blocked.down){
                return
            }
            else if (this.player.body.blocked.right){
                return
            }
            else if (this.player.body.blocked.left){
                return
            }
            else{
                this.sol = true
                this.sdsaut = true
                this.dsaut = false
            }
        }
        
        if (this.gravite == 3){
            if(this.player.body.blocked.down){
                return
            }
            else if (this.player.body.blocked.up){
                return
            }
            else if (this.player.body.blocked.right){
                return
            }
            else{
                this.sol = true
                this.sdsaut = true 
                this.dsaut = false
            }
        }
    }
    
    Dommage (player, ennemi){
        
        if (this.invincible == false){
            this.playerHP -= 1
            this.invincible = true
        }
        
        
    }
    
    Getfruit (player, fruit){
        fruit.destroy();
        this.invFruit = this.invFruit + 1
    }
    
    
   
}// fin de Class