class Rock extends Phaser.GameObjects.Sprite{
    
    constructor (scene, x, y, texture ){
        super(scene, x, y, texture);
         
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
         
        this.particule = new Particules();
        this.body.setGravityY(puissanceDeGravite)
    
        
        
        
        this.direction = true

        this.rock_1 = this.scene.add.sprite(this.body.x  ,this.body.y,'rock');
        
  
        console.log(this) 
    }
        
    Update(){ 
        
        if (this.direction){
            this.body.setVelocityX(400)
            this.D = 54
        }
        else{
            this.body.setVelocityX(-400)
            this.D = -54
        }
       
        
        
        if (this.body.blocked.down) {
            this.angle = 0;
            this.scene.cameras.main.shake(50, 0.001)
            this.anims.play('rock_hide',true)
            this.onde = this.scene.add.sprite(this.body.x + this.D  ,this.body.y + 27 ,'rock')
            this.onde.anims.play('rock_chaine',true)
        }
        else{   
            this.anims.play('rock_bool',true)
            this.angle += 15;
        }
        
        if (this.body.blocked.left){
            this.direction = true
        }
        
        if (this.body.blocked.right){
            this.direction = false
        }
        
        if (this.body.y >= 2160){
            this.body.destroy(true, true);   
        }
    
    }
    

  
}