class controle {  // Copier Coller a modifier

    constructor (player, droit, gauche, haut, bas, space, gravite, saut, sautAxis, Deplacement, gravitePuissence, Jump, sol){
        this.player = player;
        
        this.droit = droit;
        this.gauche = gauche;
        this.haut = haut;
        this.bas = bas;  
        this.space = space;
         
        this.gravite = gravite
        this.saut = saut;
        this.sautAxis = sautAxis;
        this.sol = sol;
        
        this.Deplacement = Deplacement;
        this.gravitePuissence = gravitePuissence;
        this.Jump = Jump;
    }
    
    deplacement(){
        
        //--- Vert
        if (this.gravite == 1){
            this.player.setGravityY(0)
            this.player.setGravityX(this.gravitePuissence)
            this.player.setAngle(-90);
            this.player.setFlipX(false);
    
            this.saut = (-this.Jump)
            this.sautAxis = false
            
            if(this.bas){this.player.setVelocityY(this.Deplacement)}
            if(this.haut){this.player.setVelocityY(-this.Deplacement)}
            if(!this.haut && !this.bas){this.player.setVelocityY(0)}
         
            
        }
    //--- Bleu
        else if (this.gravite == 2){
            this.player.setGravityY(-this.gravitePuissence)
            this.player.setGravityX(0)
            this.player.setAngle(-180);
            this.player.setFlipX(true);
            
            this.saut = (this.Jump)
            this.sautAxis = true
            
            if(this.droit){this.player.setVelocityX(this.Deplacement)}
            if(this.gauche){this.player.setVelocityX(-this.Deplacement)}
            if(!this.gauche && !this.droit){this.player.setVelocityX(0)}
          
        }
    //--- Rouge
        else if (this.gravite == 3){
            this.player.setGravityY(0)
            this.player.setGravityX(-this.gravitePuissence)
            this.player.setAngle(90);
            this.player.setFlipX(true);
            
            this.saut = (this.Jump)
            this.sautAxis = false
            
            if(this.haut){this.player.setVelocityY(-this.Deplacement)}
            if(this.bas){this.player.setVelocityY(this.Deplacement)}
            if(!this.bas && !this.haut){this.player.setVelocityY(0)}
           
        }
    //--- Normale
        else{
            this.player.setGravityY(this.gravitePuissence)
            this.player.setGravityX(0)
            this.player.setAngle(0);
            this.player.setFlipX(false);
            
            this.saut = (-this.Jump)
            this.sautAxis = true
            
            if(this.gauche){this.player.setVelocityX(-this.Deplacement)}
            if(this.droit){this.player.setVelocityX(this.Deplacement)}
            if(!this.droit && !this.gauche){this.player.setVelocityX(0)}
        
        }
        
        if (this.space && this.sol){
            this.sol = false
            if (this.sautAxis == true){
                this.player.setVelocityY(this.saut)
            }
            else{
                this.player.setVelocityX(this.saut)
            }
        }
        
        
        
        
    }
    
     
    
    
    
    
    
}