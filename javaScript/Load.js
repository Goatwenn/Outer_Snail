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
        this.load.spritesheet("snail", 'assets/snail.png',{frameWidth:108, frameHeight:54});
        this.load.spritesheet("vie", 'assets/barreDeVie.png',{frameWidth:218, frameHeight:54});
        this.load.spritesheet("inventaire", 'assets/inventaire.png',{frameWidth:100, frameHeight:100});
        this.load.spritesheet("CDF", 'assets/compteurDeFruit.png',{frameWidth:192, frameHeight:78});
        
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
        
        console.log(this);
        this.scene.start("Menu");
    }
       
}


/*

        
        this.anims.create({
            key: 'SnailG0',
            frames: [ { key: 'snail', frame: 0. } ],
        });
        
        this.anims.create({
            key: 'SnailG1',
            frames: [ { key: 'snail', frame: 1. } ],
        });
        
         this.anims.create({
            key: 'SnailG2',
            frames: [ { key: 'snail', frame: 2. } ],
        });
        
         this.anims.create({
            key: 'SnailG3',
            frames: [ { key: 'snail', frame: 3. } ],
        });
        
        */