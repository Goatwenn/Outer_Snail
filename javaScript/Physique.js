class Physique {  // Copier Coller a modifier

    constructor (player, gravite){
        
        this.player = player;
        this.gravite = gravite
        this.puissanceDeGravite = 400;
      
    }
    
    Gravite(){
        
        console.log(this)
        /*
        //--- Vert
        if (this.gravite == 1){
            this.player.setGravityY(0)
            this.player.setGravityX(this.puissanceDeGravite)
            this.player.setAngle(-90);
            this.player.setFlipX(false);
    
        
            
        }
    //--- Bleu
        else if (this.gravite == 2){
            this.player.setGravityY(-this.puissanceDeGravite)
            this.player.setGravityX(0)
            this.player.setAngle(-180);
            this.player.setFlipX(true);
        
          
        }
    //--- Rouge
        else if (this.gravite == 3){
            this.player.setGravityY(0)
            this.player.setGravityX(-this.puissanceDeGravite)
            this.player.setAngle(90);
            this.player.setFlipX(true);
    
           
        }
    //--- Normale
        else{*/
            this.player.setGravityY(this.puissanceDeGravite)
            this.player.setGravityX(0)
            this.player.setAngle(0);
            this.player.setFlipX(false);
            
     
        
    }
    
     
    
    
    
    
    
}