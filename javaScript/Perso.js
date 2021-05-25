class Perso extends Phaser.GameObjects.Sprite{
    
     constructor (scene, x, y, texture, gravite ){
         super(scene, x, y, texture);
         
         scene.add.existing(this);
         scene.physics.world.enableBody(this);
         
         this.gravite = gravite
         
         this.vitesseDeDeplacement = 300;
         this.HauteurDeSaut = 350;
         this.puissanceDeGravite = 400;
         
         console.log(this)  
    }
 
    
    Stop (){
        this.body.setVelocityX(0);
        this.body.setGravityY(400)
        
    }
    
    Droit (){   
        this.body.setVelocityX(this.vitesseDeDeplacement);
    }
   
    Gauche (){
        this.body.setVelocityX(-this.vitesseDeDeplacement);
    }  
    
    
    
    
    Jump (){
        this.body.setVelocityY(-this.HauteurDeSaut);
    } 
    
    
    
    Gravite(){
        
        console.log(this.gravite) 
        
        if (this.gravite == 1){
            this.body.setGravityY(0)
            this.body.setGravityX(this.puissanceDeGravite)
        }
        if (this.gravite == 2){
            this.body.setGravityY(-this.puissanceDeGravite)
            this.body.setGravityX(0)
        }
        if (this.gravite == 3){
            this.body.setGravityY(0)
            this.body.setGravityX(this.puissanceDeGravite)
        }
        else {
            this.body.setGravityY(this.puissanceDeGravite)
            this.body.setGravityX(0)
        }
        
    }
    
    
}