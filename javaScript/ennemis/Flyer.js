class Flyer extends Phaser.GameObjects.Sprite{
    
     constructor (scene, x, y, texture){
         super(scene, x, y, texture);
         
         scene.add.existing(this);
         scene.physics.world.enableBody(this);
         
         this.scene = scene;
         
         console.log(this); 
         this.particule = new Particules();
         //this.body.immovable = true;
         
         this.body.setSize(54,54);

         
         this.shootOn = false;
         this.randomTimer = 0;
         
         this.shoot_Timer = 100;
         this.rayonAction = 900
         this.rayonhauteur = 10;
         this.vitesseDeDeplacement = 400
         
         this.dead = false
         this.stop = false
         
         this.Limite(this.scene);
  
     }
    
    Update(){
        
        
        if (this.shootOn || !this.dead && this.scene.player.x <= this.body.x + this.rayonAction && this.scene.player.x > this.body.x - this.rayonAction && 
        this.scene.player.y >= this.body.y - this.rayonhauteur && this.scene.player.y <= this.body.y + this.rayonhauteur ){
            this.Shoot();
        }
        else if (!this.dead){
            this.Move();
        }
        else{
             this.Dead();
        }
        
        this.scene.physics.add.overlap(this.scene.player, this.scene.lazer_shoot, this.Dommage, null, this);  
    }
    
    Shoot(){
        
        
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
        
        this.shootOn = true;
        this.shoot_Timer -=  1
        
        
        this.anims.play('flyer_charge', true);
        
        if(this.shoot_Timer == 99){
                this.lazer_charge = this.scene.add.sprite(this.body.x+27 ,this.body.y +27 ,'lazer_charge')
                this.lazer_charge.anims.play('lazer_charge', true); 
            }
        
        if(this.shoot_Timer <= 50 && this.shoot_Timer >= 20){
            
            if(this.shoot_Timer == 50){
                this.scene.lazer_shoot = this.scene.physics.add.sprite(this.body.x+27 ,this.body.y +27 ,'lazer_shoot')
                this.scene.lazer_shoot.anims.play('lazer_shoot', true);
            }
            this.anims.play('flyer_shoot', true);
        }
        else if(this.shoot_Timer <= 20 && this.shoot_Timer >= 1){
            this.scene.lazer_shoot.destroy(true, true);
            this.lazer_charge.destroy(true, true);
            this.anims.play("flyer_fermer");
        }
        else if (this.shoot_Timer <= 0){
            this.shoot_Timer = 100
            this.shootOn = false;
        }
    }
        
    
    Move(){
        
        if (!this.stop){
            this.anims.play("flyer_fermer");
        
            this.randomTimer = this.randomTimer + 1;

            if (this.randomTimer >= 10){
                this.randomTimer = 0; 
                this.randowmNBX = Phaser.Math.Between(0, 6);
                this.randowmNBY = Phaser.Math.Between(0, 6);
            }

            if(this.randowmNBX == 1){
                this.body.setVelocityX(this.vitesseDeDeplacement);
            }
            else if(this.randowmNBX == 2){
                this.body.setVelocityX( - this.vitesseDeDeplacement);
            }
            else{
                this.body.setVelocityX(0);
            }

            if(this.randowmNBY == 1){
                this.body.setVelocityY(this.vitesseDeDeplacement);
            }
            else if(this.randowmNBY == 2){
                this.body.setVelocityY( - this.vitesseDeDeplacement);
            }
            else{
                this.body.setVelocityY(0);
            }
        }
    }
    
    Limite(scene){
        
       
     
        
    }
    

    Dommage(player,ennemi){
        this.scene.player.Vie();  
    }
    
    
    Dead(){
        this.dead = true
        console.log('Flyer Dead')
        this.anims.play('flyer_dead');
        
        this.body.destroy(true, true);
        
        
    }

    
}


