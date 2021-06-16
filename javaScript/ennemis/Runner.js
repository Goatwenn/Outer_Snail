class Runner extends Phaser.GameObjects.Sprite{
    
     constructor (scene, x, y, texture, grav){
         super(scene, x, y, texture);
         
         scene.add.existing(this);
         scene.physics.world.enableBody(this);
         
         console.log(this) 
         
         this.gravite = grav;
         this.particule = new Particules();
         
         this.scene.physics.add.collider(this.body, this.scene.collideLayer);
         
         this.body.setSize(54,54);
         
         
         if ( this.gravite == 0){
             this.body.setGravityY(puissanceDeGravite)
             this.angle = 0;
         }
         else if ( this.gravite == 1){
             this.body.setGravityX(puissanceDeGravite)
             this.angle = - 90;
         }
         else if ( this.gravite == 2){
             this.body.setGravityY(- puissanceDeGravite)
             this.angle = - 90;
         }
         else if ( this.gravite == 3){
             this.body.setGravityX(- puissanceDeGravite)
             this.angle = - 90;
         }
         
         
         this.randomTimer = 0;
         this.dead = false ;
        
         this.vitesseDeDeplacement = 200;
         this.rayonAction = 800;
         this.rayonHauteur = 400
         this.chargeAcceleration = 500;
  
    }
    
 
    Update(){ 

        if(this.gravite == 0 && this.scene.player.x >= this.body.x - this.rayonAction && this.scene.player.x < this.body.x && 
            this.scene.player.y >= this.body.y - this.rayonHauteur && this.scene.player.y <= this.body.y + this.rayonHauteur|| 
            this.gravite == 1 && this.scene.player.y >= this.body.y - this.rayonAction && this.scene.player.y < this.body.y && 
            this.scene.player.x >= this.body.x - this.rayonHauteur && this.scene.player.x <= this.body.x + this.rayonHauteur ||
            this.gravite == 2 && this.scene.player.x >= this.body.x - this.rayonAction && this.scene.player.x < this.body.x && 
            this.scene.player.y >= this.body.y - this.rayonHauteur && this.scene.player.y <= this.body.y + this.rayonHauteur ||
            this.gravite == 3 && this.scene.player.y >= this.body.y - this.rayonAction && this.scene.player.y < this.body.y && 
            this.scene.player.x >= this.body.x - this.rayonHauteur && this.scene.player.x <= this.body.x + this.rayonHauteur){
            this.Charge("droit")
        }
        
        
        else if(this.gravite == 0 && this.scene.player.x <= this.body.x + this.rayonAction && this.scene.player.x > this.body.x && 
            this.scene.player.y >= this.body.y - this.rayonHauteur && this.scene.player.y <= this.body.y + this.rayonHauteur ||
            this.gravite == 1 && this.scene.player.y <= this.body.y + this.rayonAction && this.scene.player.y > this.body.y && 
            this.scene.player.x >= this.body.x - this.rayonHauteur && this.scene.player.x <= this.body.x + this.rayonHauteur ||
            this.gravite == 2 && this.scene.player.y <= this.body.y + this.rayonAction && this.scene.player.y > this.body.y && 
            this.scene.player.y >= this.body.y - this.rayonHauteur && this.scene.player.y <= this.body.y + this.rayonHauteur ||
            this.gravite == 3 && this.scene.player.y <= this.body.y + this.rayonAction && this.scene.player.y > this.body.y && 
            this.scene.player.x >= this.body.x - this.rayonHauteur && this.scene.player.x <= this.body.x + this.rayonHauteur){
            this.Charge("gauche")
        }
        
        
        else {
            
            this.body.setAccelerationY(-0);
            this.body.setAngularVelocity(0);

            if ( this.gravite == 0){
                this.angle = 0;
            }
            else if ( this.gravite == 1){
                this.angle = - 90;
            }
            else if ( this.gravite == 2){
                this.angle = 180;
            } 
            else if ( this.gravite == 3){
                this.angle = 90;
            } 
            this.Marche()          
        }
    }
    
    Charge(CD){
        if (this.dead != true){
                this.chargeDirection = CD
        
            if (this.chargeDirection == "droit"){
                
                if ( this.gravite == 0){
                    this.body.setAccelerationX(-this.chargeAcceleration);
                    this.body.setAngularAcceleration(-this.chargeAcceleration);
                    this.particule.Frotement(this.scene, "vert", this.body, 54, 54 );
                }
                else if ( this.gravite == 1){
                    this.body.setAccelerationY(-this.chargeAcceleration);
                    this.body.setAngularAcceleration(this.chargeAcceleration);
                    this.particule.Frotement(this.scene, "vert", this.body, 54, 54 );
                }
                else if ( this.gravite == 2){
                    this.body.setAccelerationX(-this.chargeAcceleration);
                    this.body.setAngularAcceleration(this.chargeAcceleration);
                    this.particule.Frotement(this.scene, "vert", this.body, 54, 0 );
                } 
                else if ( this.gravite == 3){
                    this.body.setAccelerationY(-this.chargeAcceleration);
                    this.body.setAngularAcceleration(-this.chargeAcceleration);
                    this.particule.Frotement(this.scene, "vert", this.body, 0, 54 );
                }
                
                this.anims.play('runner_boule', true);
                
                
            }
        
            if (this.chargeDirection == "gauche"){
                
                 if ( this.gravite == 0){
                    this.body.setAccelerationX(this.chargeAcceleration);
                    this.body.setAngularAcceleration(this.chargeAcceleration);
                     this.particule.Frotement(this.scene, "vert", this.body, 0, 54 );
                }
                else if ( this.gravite == 1){
                    this.body.setAccelerationY(this.chargeAcceleration);
                    this.body.setAngularAcceleration(-this.chargeAcceleration);
                    this.particule.Frotement(this.scene, "vert", this.body, 54, 0 );
                }
                else if ( this.gravite == 2){
                    this.body.setAccelerationX(this.chargeAcceleration);
                    this.body.setAngularAcceleration(-this.chargeAcceleration);
                    this.particule.Frotement(this.scene, "vert", this.body, 0, 0 );
                } 
                else if ( this.gravite == 3){
                    this.body.setAccelerationY(this.chargeAcceleration);
                    this.body.setAngularAcceleration(this.chargeAcceleration);
                    this.particule.Frotement(this.scene, "vert", this.body, 0, 0 );
                }
               
                this.anims.play('runner_boule', true);
            }
        }  
    }
    
    Marche (){
        
        this.randomTimer = this.randomTimer + 1;
        
        if (this.randomTimer >= 30){
            this.randomTimer = 0; 
            this.randowmNB = Phaser.Math.Between(0, 4);
        }
        
        if (this.dead != true){
            if (this.randowmNB == 0){

                if ( this.gravite == 0){
                    this.body.setVelocityX(this.vitesseDeDeplacement);
                    this.flipX = false ;
                }
                else if ( this.gravite == 1){
                    this.body.setVelocityY(this.vitesseDeDeplacement);
                    this.flipX = true ;
                }
                else if ( this.gravite == 2){
                    this.body.setVelocityX(this.vitesseDeDeplacement);
                    this.flipX = true ;
                } 
                else if ( this.gravite == 3){
                    this.body.setVelocityY(this.vitesseDeDeplacement);
                    this.flipX = false ;
                } 
                
                this.anims.play('runner_marche', true);
            }
            else if (this.randowmNB == 1){
                
                
                 if ( this.gravite == 0){
                    this.body.setVelocityX(- this.vitesseDeDeplacement);
                    this.flipX = true ;
                }
                else if ( this.gravite == 1){
                    this.body.setVelocityY(- this.vitesseDeDeplacement);
                    this.flipX = false ;
                }
                else if ( this.gravite == 2){
                    this.body.setVelocityX(- this.vitesseDeDeplacement);
                    this.flipX = false ;
                } 
                else if ( this.gravite == 3){
                    this.body.setVelocityY(- this.vitesseDeDeplacement);
                    this.flipX = true ;
                } 
                
                this.anims.play('runner_marche', true);
            }
            else {
                this.anims.play('runner_surPate', true);
                this.body.setVelocityX(0);
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