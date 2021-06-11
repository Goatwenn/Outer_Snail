class Load extends Phaser.Scene {

    constructor (){
        super("Load"); 
    }
    
    preload (){
        
    // BackGround ---------------------------------
        
        this.load.image('plan3', 'assets/plan3.png');
        this.load.image('plan4', 'assets/plan4.png');
        
        
    // TileSet ---------------------------------      
        
        this.load.image('OuterSnail_TileSet', 'assets/mondes/OuterSnail_TileSet.png');
        
        
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
        this.load.spritesheet("thrower", 'assets/ennemis/thrower.png',{frameWidth:108, frameHeight:108});
        
        
    // Particules ---------------------------------
        
        this.load.image('particule_bleu1', 'assets/particules/particule_energie_1.png');
        this.load.image('particule_bleu2', 'assets/particules/particule_energie_2.png');
        this.load.image('particule_orange1', 'assets/particules/particule_flamme_1.png');
        this.load.image('particule_orange2', 'assets/particules/particule_flamme_2.png');
        this.load.image('particule_vert1', 'assets/particules/particule_herbe_1.png');
        this.load.image('particule_vert2', 'assets/particules/particule_herbe_2.png');
        this.load.image('particule_rouge1', 'assets/particules/particule_sang_1.png');
        this.load.image('particule_rouge2', 'assets/particules/particule_sang_2.png');
        
    // Menus --------------------------------------
        
        this.load.image('start', 'assets/menus/Main_start.png');
        this.load.image('bg', 'assets/menus/Main_bg.png');
        this.load.image('montagne', 'assets/menus/Main_montagne.png');
        this.load.image('escargot', 'assets/menus/Main_escargot.png');
        this.load.image('fruit', 'assets/menus/Main_fruit.png');
        this.load.image('title', 'assets/menus/Main_title.png');
        this.load.image('destructeur', 'assets/menus/Main_destructeur.png');
        
 // Menus --------------------------------------
        this.load.image('UI', 'assets/menus/map/ui_bg.png');
        this.load.spritesheet('cdf', 'assets/menus/map/cdf.png',{frameWidth:384, frameHeight:156});
        this.load.spritesheet('titre', 'assets/menus/map/titre.png',{frameWidth:120, frameHeight:54});
 // Menus --------------------------------------
        this.load.image('debug_BG', 'assets/menus/debug_BG.png');
        this.load.image('menu', 'assets/menus/pauseBG.png');
        
 // Mobil --------------------------------------
        
        this.load.spritesheet('Down_arrow', 'assets/mobil/down_arrow.png',{frameWidth:162, frameHeight:162});
        this.load.spritesheet('Up_arrow', 'assets/mobil/up_arrow.png',{frameWidth:162, frameHeight:162});
        this.load.spritesheet('Right_arrow', 'assets/mobil/right_arrow.png',{frameWidth:162, frameHeight:162});
        this.load.spritesheet('Left_arrow', 'assets/mobil/left_arrow.png',{frameWidth:162, frameHeight:162});
        
        
        
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
        
        this.anims.create({
            key: 'dash_droit',
            frames: [ { key: 'snail', frame: 5. } ],
        });
        
        this.anims.create({
            key: 'dash_gauche',
            frames: [ { key: 'snail', frame: 1. } ],
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
            key: 'runner_dead',
            frames: [ { key: 'runner', frame: 8. } ],
        });
        
        this.anims.create({
            key: 'runner_marche',
            frames: this.anims.generateFrameNumbers('runner', { start: 1, end: 6 }),
            frameRate: 12,
        });
        
        
        
     // Thrower
        this.anims.create({
            key: 'hide',
            frames: this.anims.generateFrameNumbers('thrower', { start: 0, end: 4 }),
            frameRate: 24,
        });  
        
        this.anims.create({
            key: 'un_hide',
            frames: this.anims.generateFrameNumbers('thrower', { start: 5, end: 9 }),
            frameRate: 24,
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
            key: 'vie0',
            frames: [ { key: 'vie', frame: 4. } ],
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
        
        
    // Cdt
        this.anims.create({
            key: 'cdf0' ,
            frames: [ { key: 'cdf', frame: 0. } ],
        });
        
        this.anims.create({
            key: 'cdfundefined',
            frames: [ { key: 'cdf', frame: 0. } ],
        });
        
        this.anims.create({
            key: 'cdf1',
            frames: [ { key: 'cdf', frame: 1. } ],
        });
        
        this.anims.create({
            key: 'cdf2',
            frames: [ { key: 'cdf', frame: 2. } ],
        });
        
        this.anims.create({
            key: 'cdf3',
            frames: [ { key: 'cdf', frame: 3. } ],
        });
        
    // titre des niveaux
        
        this.anims.create({
            key: 'ntTest' ,
            frames: [ { key: 'titre', frame: 0. } ],
        });
        
        this.anims.create({
            key: 'nt1' ,
            frames: [ { key: 'titre', frame: 1. } ],
        });
        
        this.anims.create({
            key: 'nt2' ,
            frames: [ { key: 'titre', frame: 2. } ],
        });
     
        this.anims.create({
            key: 'nt3' ,
            frames: [ { key: 'titre', frame: 3. } ],
        });
     
        this.anims.create({
            key: 'nt4' ,
            frames: [ { key: 'titre', frame: 4. } ],
        });
        
        this.anims.create({
            key: 'nt5' ,
            frames: [ { key: 'titre', frame: 5. } ],
        });
        
        this.anims.create({
            key: 'nt6' ,
            frames: [ { key: 'titre', frame: 6. } ],
        });
        
     
        
        console.log(this);
        this.scene.start("Menu");
    }
       
}
