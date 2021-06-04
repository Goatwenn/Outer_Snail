class Runner extends Phaser.GameObjects.Sprite{
    
     constructor (scene, x, y, texture ){
         super(scene, x, y, texture);
         
         scene.add.existing(this);
         scene.physics.world.enableBody(this);
         
         console.log(this) 
         
         this.body.setSize(54,54);
         
         this.randomTimer = 0;
         
         this.vitesseDeDeplacement = 200;
         this.puissanceDeGravite = 400;
         this.rayonAction = 500;
         this.chargeAcceleration = 500;
  
    }
    
 
    update(x, y){ 
        
        this.playerX = x
        this.playerY = y
        this.randomTimer = this.randomTimer + 1;
        
        
        
        
        if (this.randomTimer >= 30){
            this.randomTimer = 0; 
            this.randowmNB = Phaser.Math.Between(0, 4);
        }
        
        this.body.setGravityY(this.puissanceDeGravite)
        
        
        
        
        
        if(this.playerX >= this.body.x - this.rayonAction && this.playerX < this.body.x ){
            this.Charge("droit")
        }
        else if(this.playerX <= this.body.x + this.rayonAction && this.playerX > this.body.x ){
            this.Charge("gauche")
        }
        else {
            this.body.setVelocityX(0);
            this.body.setAngularAcceleration(0);
            this.body.setAngularVelocity(0);
            this.angle = 0;
            this.Normal()          
        }
        
       
        
        
        
    }
    
    Charge(CD){
        
        this.chargeDirection = CD
        
        if (this.chargeDirection == "droit"){
            this.body.setAccelerationX(-this.chargeAcceleration);
            this.body.setAngularAcceleration(-this.chargeAcceleration);   
            this.anims.play('runner_boule', true);
        }
        
        if (this.chargeDirection == "gauche"){
            this.body.setAccelerationX(this.chargeAcceleration);
            this.body.setAngularAcceleration(this.chargeAcceleration);
            this.anims.play('runner_boule', true);
        }   
    }
    
    Normal (){
        
        if (this.randowmNB == 0){
            this.body.setVelocityX(this.vitesseDeDeplacement);
            this.flipX = false ;
            this.anims.play('runner_marche', true);
        }
        else if (this.randowmNB == 1){
            this.body.setVelocityX(-this.vitesseDeDeplacement);
            this.flipX = true ;
            this.anims.play('runner_marche', true);
        }
        else {
            this.anims.play('runner_surPate', true);
        }

    }
   
        
    
}