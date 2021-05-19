class mfe {  // Copier Coller a modifier

    constructor (player, playerHP, ennemi, Rn){
        this.player = player;
        this.playerHP = playerHP;
        this.ennemi = ennemi;
        this.Rn = Rn;
            
        
    }
    
  
    
    iA_ennemi(){
        
        if (this.Rn == 0){
                this.ennemi.setVelocityX( 200)
            }
            else if (this.Rn == 1){
                this.ennemi.setVelocityX(-200)
            }
            else if (this.Rn >=2){
                this.ennemi.setVelocityX(0)
            }
        
        
    }
 
    mort(){
        console.log (this);
        
        
        this.player.x = 140
        this.player.y = 1550
        
    }
}
      
/*
    this.commende = new mfe();
    this.commende.mort();
        
        */