class load extends Phaser.Scene {  // Copier Coller a modifier

    constructor (){
        super("load");   // Copier Coller a modifier
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
        
        
    // Menus --------------------------------------
        
        this.load.image('debug_BG', 'assets/menus/debug_BG.png');
        this.load.image('menu', 'assets/menus/pauseBG.png');
        
    }
    
    create (){
        
        console.log('load');
        this.scene.start("zoneTest");
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