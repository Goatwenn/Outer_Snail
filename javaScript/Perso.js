class Perso extends Phaser.GameObjects.Sprite{
    
     constructor (scene, x, y, texture ){
         super(scene, x, y, texture);
         
         scene.add.existing(this);
         scene.physics.world.enableBody(this);
         
         console.log(this) 
         
         this.body.setSize(54,54);

         this.dashOn = false
         this.sol = false
         this.dsaut = false
         this.sdsaut = false
         
         this.gravite = 0;
         this.gravX = 0;
         this.newgravX = 0;
         
         this.lastDirection = 'droit';
         
         this.vitesseDeDeplacement = 300;
         this.hauteurDeSaut = 350;
         this.puissanceDeGravite = 400;
         
        this.dashTimer = 0
         this.dureDeDash = 30
         this.vitesseDeDash = 800;
          
    }
    update(){
        
       if (this.dashOn == true){
           
           this.dashTimer = this.dashTimer + 1
           
           
           if (this.lastDirection == "droit"){
               this.body.setVelocityX(this.vitesseDeDash);
           }
           else if (this.lastDirection == "gauche"){
               this.body.setVelocityX(-this.vitesseDeDash);
           }
           
           
           
           
          
           
           
           
           if (this.dashTimer >= this.dureDeDash){
               this.dashOn = false
               this.dashTimer = 0 
           }
       }
  
        
        
        
        
        if (this.gravite == 0){
            
            if (this.body.blocked.down){
                this.sol = true
                this.sdsaut = true   
            
            }
        }
        else if (this.gravite == 1){
            
            if (this.body.blocked.down){
                this.sol = true
                this.sdsaut = true   
            
            }
        }
        else if (this.gravite == 2){
   
            if (this.body.blocked.down){
                this.sol = true
                this.sdsaut = true   
            
            }
        }
        else if (this.gravite == 3){
            
            if (this.body.blocked.down){
                this.sol = true
                this.sdsaut = true   
            
            }
        }
    
        
        
        
        
        if (this.space && this.sol){
            this.sol = false
            
            
            if(this.gravite == 3){
                this.body.setVelocityX(this.hauteurDeSaut);
            }
            else if(this.gravite == 2){
                this.body.setVelocityY(this.hauteurDeSaut);
            }
            else if(this.gravite == 1){
                this.body.setVelocityX(-this.hauteurDeSaut);
            }
            else if(this.gravite == 0){
                this.body.setVelocityY(-this.hauteurDeSaut);
            }
            
            
        }
        
        if (!this.space && !this.sol && this.sdsaut){
            this.dsaut = true
        }
        
        if (this.space && !this.sol && this.dsaut){
            this.dsaut = false
            this.sdsaut = false

            
            if(this.gravite == 3){
                this.body.setVelocityX(this.hauteurDeSaut);
            }
            else if(this.gravite == 2){
                this.body.setVelocityY(this.hauteurDeSaut);
            }
            else if(this.gravite == 1){
                this.body.setVelocityX(-this.hauteurDeSaut);
            }
            else if(this.gravite == 0){
                this.body.setVelocityY(-this.hauteurDeSaut);
            }

        }
        
        
        
    }
 
    
    Stop (){
        
        if (this.dashOn == false){
        
            if (this.gravite == 0 || this.gravite == 2 ){
                this.body.setVelocityX(0);
            }
            else if (this.gravite == 1 || this.gravite == 3 ){
                this.body.setVelocityY(0);
            }
        }
        
    }
    
    Droit (){ 
        if (this.dashOn == false){
            if (this.gravite == 0 || this.gravite == 2 ){
                this.body.setVelocityX(this.vitesseDeDeplacement);
                this.lastDirection = 'droit'
            } 
        }
    }
   
    Gauche (){
        if (this.dashOn == false){
            if (this.gravite == 0 || this.gravite == 2 ){
                this.body.setVelocityX(-this.vitesseDeDeplacement);
                this.lastDirection = 'gauche'
            }
        }
    } 
    
    Haut (){ 
        if (this.dashOn == false){
            if (this.gravite == 1 || this.gravite == 3 ){
                this.body.setVelocityY(-this.vitesseDeDeplacement);
                this.lastDirection = 'haut'
            }  
        }
    }
   
    Bas (){
        if (this.dashOn == false){
            if (this.gravite == 1 || this.gravite == 3 ){
                this.body.setVelocityY(this.vitesseDeDeplacement);
                this.lastDirection = 'bas'
            }
        }
    } 
    
    
    noJump (){
        this.space = false
    }

    Jump (){
        this.space = true
        
    } 
    
    
    
    Dash (){
        this.dashOn = true
    }
    
    
    Jetpack (){
        
        
        
    }
    
    
    
    Gravite_Rouge(){
        this.body.setGravityY(0) 
        this.body.setGravityX(-this.puissanceDeGravite)  
        
        this.gravite = 3   
    }
    Gravite_Bleu(){
        this.body.setGravityY(-this.puissanceDeGravite)  
        this.body.setGravityX(0) 
        
        this.gravite = 2
    }
    Gravite_Vert(){
        this.body.setGravityY(0)
        this.body.setGravityX(this.puissanceDeGravite)  
        
        this.gravite = 1
    }
    Gravite_Blanc(){
        this.body.setGravityY(this.puissanceDeGravite)  
        this.body.setGravityX(0) 
        
        this.gravite = 0
    }
    
    
}