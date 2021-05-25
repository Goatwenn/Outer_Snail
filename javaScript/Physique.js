class Physique extends Phaser.GameObjects.Sprite{
    
     constructor (gravite){

         this.gravite = gravite;
         this.gravitePuissence = 300;
         
         console.log(this)  
    }
 
    Grav (){
        this.player.setGravityY(this.gravitePuissence)
        this.player.setGravityX(0)
        this.player.setAngle(0);
        this.player.setFlipX(false);
    }
     
}