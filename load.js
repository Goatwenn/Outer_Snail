class load extends Phaser.Scene {  // Copier Coller a modifier

    constructor (){
        super("load");   // Copier Coller a modifier
    }
    
    preload (){

        this.load.spritesheet("snail", 'assets/snail.png',{frameWidth:108, frameHeight:54});
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