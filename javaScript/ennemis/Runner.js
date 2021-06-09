class Runner extends Phaser.GameObjects.Sprite{
    
     constructor (scene, x, y, texture ){
         super(scene, x, y, texture);
         
         scene.add.existing(this);
         scene.physics.world.enableBody(this);
         
         console.log(this) 
         
         this.particule = new Particules();
         
         this.scene.physics.add.collider(this.body, this.scene.collideLayer);
         
         
         this.body.setGravityY(puissanceDeGravite)
         this.body.setSize(54,54);
        
         this.randomTimer = 0;
         this.dead = false ;
        
         this.vitesseDeDeplacement = 200;
         this.rayonAction = 500;
         this.chargeAcceleration = 500;
  
    }
    
 
    update(){ 
        
        this.randomTimer = this.randomTimer + 1;
        
        
        
        
        if (this.randomTimer >= 30){
            this.randomTimer = 0; 
            this.randowmNB = Phaser.Math.Between(0, 4);
        }
        
        
        
        
        
        
        
        if(this.scene.player.x >= this.body.x - this.rayonAction && this.scene.player.x < this.body.x ){
            this.Charge("droit")
        }
        else if(this.scene.player.x <= this.body.x + this.rayonAction && this.scene.player.x > this.body.x ){
            this.Charge("gauche")
        }
        else {
            this.body.setVelocityX(0);
            this.body.setAngularAcceleration(0);
            this.body.setAngularVelocity(0);
            this.angle = 0;
            this.Marche()          
        }
    }
    
    Charge(CD){
        if (this.dead != true){
                this.chargeDirection = CD
        
            if (this.chargeDirection == "droit"){
                this.body.setAccelerationX(-this.chargeAcceleration);
                this.body.setAngularAcceleration(-this.chargeAcceleration);   
                this.anims.play('runner_boule', true);
                
                this.particule.Frotement(
                    this.scene, // Scenne
                    "vert",       // P = Particule + Couleur
                    this.body,  // Target
                    54,          // OffSet X
                    54,          // OffSet Y
                );
            }
        
            if (this.chargeDirection == "gauche"){
                this.body.setAccelerationX(this.chargeAcceleration);
                this.body.setAngularAcceleration(this.chargeAcceleration);
                this.anims.play('runner_boule', true);
                
                this.particule.Frotement(
                    this.scene, // Scenne
                    "vert",       // P = Particule + Couleur
                    this.body,  // Target
                    0,          // OffSet X
                    54,          // OffSet Y
                );
            }
        }  
    }
    
    Marche (){
        
        if (this.dead != true){
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
   
    
    Dead(){
        console.log('Runner Dead')
        this.dead = true
        this.anims.play('runner_dead');
        this.body.destroy(true, true);
        this.angle = 0;
        
    }
        
    
}