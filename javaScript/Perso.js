class Perso extends Phaser.GameObjects.Sprite{
    
     constructor (scene, x, y, texture ){
         super(scene, x, y, texture);
         
         scene.add.existing(this);
         scene.physics.world.enableBody(this);
         
         this.vitesseDeDeplacement = 300;
         this.HauteurDeSaut = 350;
         this.puissanceDeGravite = 400;
         
         console.log(this)  
    }
 
    
    Stop (){
        this.body.setVelocityX(0);
    }
    
    Droit (){
        this.body.setVelocityX(this.vitesseDeDeplacement);
    }
   
    Gauche (){
        this.body.setVelocityX(-this.vitesseDeDeplacement);
    }   
}