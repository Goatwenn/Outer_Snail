class Rock extends Phaser.GameObjects.Sprite{
    
    constructor (scene, x, y, texture ){
        super(scene, x, y, texture);
         
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
         
        
        this.anims.play('rock_wave', true);
        
        //this.scene.physics.add.collider(this.body, this.collideLayer);
        
        this.on == true
        
        console.log(this) 
    }
        
    Update(){
        
         this.rock_1 = this.scene.add.sprite(this.body.x + 100 ,this.body.y,'rock')
           
    
    }
    
    
    
    
   
    
    
    
    
}