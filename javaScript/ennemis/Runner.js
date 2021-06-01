class Runner extends Phaser.GameObjects.Sprite{
    
     constructor (scene, x, y, texture ){
         super(scene, x, y, texture);
         
         scene.add.existing(this);
         scene.physics.world.enableBody(this);
         
         console.log(this) 
         
         
         
         this.puissanceDeGravite = 400;
         this.rayonAction = 500;
         this.chargeAcceleration = 500;
         
          
    }
    
    
    update(x, y){ 
        
        this.playerX = x
        this.playerY = y
        
        this.body.setGravityY(this.puissanceDeGravite)
        
        
        if(this.playerX >= this.body.x - this.rayonAction && this.playerX < this.body.x ){
            this.Charge("droit")
        }
        else if(this.playerX <= this.body.x + this.rayonAction && this.playerX > this.body.x ){
            this.Charge("gauche")
        }
        else {
            
           this.body.setVelocityX(0)
                   
        }
        
       
    }
    
    Charge(CD){
        
        this.chargeDirection = CD
        
        if (this.chargeDirection == "droit"){
            this.body.setAccelerationX(-this.chargeAcceleration)
            this.body.rotation += 1 
        }
        
        if (this.chargeDirection == "gauche"){
            this.body.setAccelerationX(this.chargeAcceleration)
        }
        
        
        
    }
    
   
        
    
}