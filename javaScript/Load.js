class Load extends Phaser.Scene {

    constructor (){
        super("Load"); 
    }
    
    preload (){
        
    // BackGround ---------------------------------
        
        this.load.image('plan3', 'assets/plan3.png');
        this.load.image('plan4', 'assets/plan4.png');
        
    // Object -------------------------------------
        
        this.load.image('ennemi', 'assets/ennemi.png');
        this.load.image('hitbox', 'assets/hitbox.png');
        this.load.image('fruit', 'assets/fruit.png');
        this.load.image('panneaux_dash', 'assets/panneaux_dash.png');
        this.load.image('panneaux_shield', 'assets/panneaux_shield.png');
        
        this.load.spritesheet("snail", 'assets/snail.png',{frameWidth:108, frameHeight:54});
        this.load.spritesheet("vie", 'assets/barreDeVie.png',{frameWidth:218, frameHeight:54});
        this.load.spritesheet("inventaire", 'assets/inventaire.png',{frameWidth:100, frameHeight:100});
        this.load.spritesheet('compteurDeFruit', 'assets/compteurDeFruit.png',{frameWidth:192, frameHeight:78});
        this.load.spritesheet('spaceShip', 'assets/spaceShip.png',{frameWidth:726, frameHeight:126});
        
        
    // Ennemis -------------------------------------  
        
        this.load.spritesheet("runner", 'assets/ennemis/runner.png',{frameWidth:108, frameHeight:108});
        
        
    // Particules ---------------------------------
        
        this.load.image('particule_energie_1', 'assets/particules/particule_energie_1.png');
        this.load.image('particule_energie_2', 'assets/particules/particule_energie_2.png');
        this.load.image('particule_flamme_1', 'assets/particules/particule_flamme_1.png');
        this.load.image('particule_flamme_2', 'assets/particules/particule_flamme_2.png');
        this.load.image('particule_herbe_1', 'assets/particules/particule_herbe_1.png');
        this.load.image('particule_herbe_2', 'assets/particules/particule_herbe_2.png');
        this.load.image('particule_sang_1', 'assets/particules/particule_sang_1.png');
        this.load.image('particule_sang_2', 'assets/particules/particule_sang_2.png');
        
    // Menus --------------------------------------
        
        this.load.image('start', 'assets/menus/Main_start.png');
        this.load.image('bg', 'assets/menus/Main_bg.png');
        this.load.image('montagne', 'assets/menus/Main_montagne.png');
        this.load.image('escargot', 'assets/menus/Main_escargot.png');
        this.load.image('fruit', 'assets/menus/Main_fruit.png');
        this.load.image('title', 'assets/menus/Main_title.png');
        this.load.image('destructeur', 'assets/menus/Main_destructeur.png');
        
        this.load.image('debug_BG', 'assets/menus/debug_BG.png');
        this.load.image('menu', 'assets/menus/pauseBG.png');
    }
    
    create (){
    //--- Animations  : ----------------------------------------------------------
        
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
        
        
        
        
        
    // Runner
        this.anims.create({
            key: 'runner_boule',
            frames: [ { key: 'runner', frame: 7. } ],
        });
        
        this.anims.create({
            key: 'runner_surPate',
            frames: [ { key: 'runner', frame: 0. } ],
        });
    
        this.anims.create({
            key: 'runner_marche',
            frames: this.anims.generateFrameNumbers('runner', { start: 1, end: 6 }),
            frameRate: 12,
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
    
    
        
        
        
      // Compteur de Fruit
        this.anims.create({
            key: 'fruit0',
            frames: [ { key: 'compteurDeFruit', frame: 0. } ],
        });
        
        this.anims.create({
            key: 'fruit1',
            frames: [ { key: 'compteurDeFruit', frame: 1. } ],
        });
        
        this.anims.create({
            key: 'fruit2',
            frames: [ { key: 'compteurDeFruit', frame: 2. } ],
        });
        
        this.anims.create({
            key: 'fruit3',
            frames: [ { key: 'compteurDeFruit', frame: 3. } ],
        });
        
   
     
        
        console.log(this);
        this.scene.start("Menu");
    }
       
}
