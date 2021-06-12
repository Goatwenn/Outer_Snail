class Load extends Phaser.Scene {

    constructor (){
        super("Load"); 
    }
    
    
    
//--- Preload  : --------------------------------------------------------------------------------- 
    
    preload (){

    // BackGround ---------------------------------
        
        this.load.image('plan3', 'assets/plan3.png');
        this.load.image('plan4', 'assets/plan4.png');
        
        
        
    // TileSet ---------------------------------   
        
        this.load.image('OuterSnail_TileSet', 'assets/mondes/OuterSnail_TileSet.png');
        
        
        
    // Object -------------------------------------
        
        this.load.image('fruit', 'assets/fruit.png');
        this.load.image('dash', 'assets/dash.png');
        this.load.image('shield', 'assets/shield.png');
        
        this.load.spritesheet("snail", 'assets/snail.png',{frameWidth:108, frameHeight:54});
        this.load.spritesheet("vie", 'assets/vie.png',{frameWidth:218, frameHeight:54});
        this.load.spritesheet("inventaire", 'assets/inventaire.png',{frameWidth:100, frameHeight:100});
        this.load.spritesheet('CDF', 'assets/compteur_de_fruit.png',{frameWidth:192, frameHeight:78});
        this.load.spritesheet('spaceship', 'assets/spaceship.png',{frameWidth:726, frameHeight:126});
        
        
        
    // Ennemis -------------------------------------  
        
        this.load.spritesheet("runner", 'assets/ennemis/runner.png',{frameWidth:108, frameHeight:108});
        this.load.spritesheet("thrower", 'assets/ennemis/thrower.png',{frameWidth:108, frameHeight:108});
        
        
        
    // Particules ---------------------------------
        
        this.load.image('bleu1', 'assets/particules/bleu_1.png');
        this.load.image('bleu2', 'assets/particules/bleu_2.png');
        this.load.image('orange1', 'assets/particules/orange_1.png');
        this.load.image('orange2', 'assets/particules/orange_2.png');
        this.load.image('vert1', 'assets/particules/vert_1.png');
        this.load.image('vert2', 'assets/particules/vert_2.png');
        this.load.image('rouge1', 'assets/particules/rouge_1.png');
        this.load.image('rouge2', 'assets/particules/rouge_2.png');
        
        
        
    // Menus --------------------------------------
        
        this.load.image('Main_background', 'assets/menu/background.png');
        this.load.image('Main_fruit', 'assets/menu/fruit.png');
        this.load.image('Main_limite', 'assets/menu/limite.png');
        this.load.image('Main_Snail', 'assets/menu/snail.png');
        this.load.image('Main_start', 'assets/menu/start.png');
        this.load.image('Main_title', 'assets/menu/title.png');
        this.load.image('Main_montagne', 'assets/menu/montagne.png');
        
        
        
    // Map --------------------------------------        

        this.load.image('map_background', 'assets/map/background.png');
        this.load.spritesheet('map_CDF', 'assets/map/compteur_de_fruit.png',{frameWidth:384, frameHeight:156});
        this.load.spritesheet('map_number', 'assets/map/number.png',{frameWidth:120, frameHeight:54});
        
        
    // Button -------------------------------------- 
        
        this.load.spritesheet('button_Down', 'assets/buttons/down.png',{frameWidth:162, frameHeight:162});
        this.load.spritesheet('button_Up', 'assets/buttons/up.png',{frameWidth:162, frameHeight:162});
        this.load.spritesheet('button_Right', 'assets/buttons/right.png',{frameWidth:162, frameHeight:162});
        this.load.spritesheet('button_Left', 'assets/buttons/left.png',{frameWidth:162, frameHeight:162});
        
        this.load.spritesheet('button_A', 'assets/buttons/touche_a.png',{frameWidth:162, frameHeight:162});
        this.load.spritesheet('button_S', 'assets/buttons/touche_s.png',{frameWidth:162, frameHeight:162});
           
    }// Fin de preload
    
    
    
//--- Create  : --------------------------------------------------------------------------------- 
    
    
    create (){
        
//--- Animations  : ----------------------------------------------------------
         
        
// Object -------------------------------------- 
        
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
            key: 'CDF0',
            frames: [ { key: 'CDF', frame: 0. } ],
        });
        this.anims.create({
            key: 'CDF1',
            frames: [ { key: 'CDF', frame: 1. } ],
        });
        this.anims.create({
            key: 'CDF2',
            frames: [ { key: 'CDF', frame: 2. } ],
        });
        this.anims.create({
            key: 'CDF3',
            frames: [ { key: 'CDF', frame: 3. } ],
        });       
        
        
        
        
        
        
// Ennemis --------------------------------------    
        
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
        
      
        
        
        
           
// Maps --------------------------------------      
        
    // Compteur De Fruit
        this.anims.create({
            key: 'cdf0' ,
            frames: [ { key: 'map_CDF', frame: 0. } ],
        });
        this.anims.create({
            key: 'cdfundefined',
            frames: [ { key: 'map_CDF', frame: 0. } ],
        });
        this.anims.create({
            key: 'cdf1',
            frames: [ { key: 'map_CDF', frame: 1. } ],
        });
        this.anims.create({
            key: 'cdf2',
            frames: [ { key: 'map_CDF', frame: 2. } ],
        });
        this.anims.create({
            key: 'cdf3',
            frames: [ { key: 'map_CDF', frame: 3. } ],
        });
        
        
        
    // Number
        this.anims.create({
            key: 'ntTest' ,
            frames: [ { key: 'map_number', frame: 0. } ],
        });
        
        this.anims.create({
            key: 'nt1' ,
            frames: [ { key: 'map_number', frame: 1. } ],
        });
        
        this.anims.create({
            key: 'nt2' ,
            frames: [ { key: 'map_number', frame: 2. } ],
        });
     
        this.anims.create({
            key: 'nt3' ,
            frames: [ { key: 'map_number', frame: 3. } ],
        });
     
        this.anims.create({
            key: 'nt4' ,
            frames: [ { key: 'map_number', frame: 4. } ],
        });
        
        this.anims.create({
            key: 'nt5' ,
            frames: [ { key: 'map_number', frame: 5. } ],
        });
        
        this.anims.create({
            key: 'ntboss' ,
            frames: [ { key: 'map_number', frame: 6. } ],
        });
        
        
        
        
        
        
 // Maps -------------------------------------- 
        
    // Button_Down
        this.anims.create({
            key: 'button_Down_0' ,
            frames: [ { key: 'button_Down', frame: 0. } ],
        });
        this.anims.create({
            key: 'button_Down_1' ,
            frames: [ { key: 'button_Down', frame: 1. } ],
        });
        
        
        
    // Button_Up
        this.anims.create({
            key: 'button_Up_0' ,
            frames: [ { key: 'button_Up', frame: 0. } ],
        });
        this.anims.create({
            key: 'button_Up_1' ,
            frames: [ { key: 'button_Up', frame: 1. } ],
        });
        
        
        
    // Button_Right
        this.anims.create({
            key: 'button_Right_0' ,
            frames: [ { key: 'button_Right', frame: 0. } ],
        });
        this.anims.create({
            key: 'button_Right_1' ,
            frames: [ { key: 'button_Right', frame: 1. } ],
        });
        
        
        
    // Button_Left
        this.anims.create({
            key: 'button_Left_0' ,
            frames: [ { key: 'button_Left', frame: 0. } ],
        });
        this.anims.create({
            key: 'button_Left_1' ,
            frames: [ { key: 'button_Left', frame: 1. } ],
        });
        
        
        
    // Button_S
        this.anims.create({
            key: 'button_S_0' ,
            frames: [ { key: 'button_S', frame: 0. } ],
        });
        this.anims.create({
            key: 'button_S_1' ,
            frames: [ { key: 'button_S', frame: 1. } ],
        });
        
        
        
    // Button_A
        this.anims.create({
            key: 'button_A_0' ,
            frames: [ { key: 'button_A', frame: 0. } ],
        });
        this.anims.create({
            key: 'button_A_1' ,
            frames: [ { key: 'button_A', frame: 1. } ],
        });
        
        
        
        
        
        
//--- Changement de scene  : ---------------------------------------------------------- 
        
        console.log(this);
        
        this.scene.start("Menu");
    }
       
}
