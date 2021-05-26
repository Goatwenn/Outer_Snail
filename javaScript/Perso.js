class Perso extends Phaser.GameObjects.Sprite{
    
     constructor (scene, x, y, texture ){
         super(scene, x, y, texture);
         
         scene.add.existing(this);
         scene.physics.world.enableBody(this);
         
         console.log(this) 
         
         this.body.setSize(54,54);

         this.dashOn = true
         
         this.gravite = 0;
         this.gravX = 0;
         this.newgravX = 0;
         
         this.lastDirection = 'droit';
         
         this.vitesseDeDeplacement = 300;
         this.hauteurDeSaut = 350;
         this.puissanceDeGravite = 400;
         
         this.dureDeDash = 20
         this.vitesseDeDash = 800;
          
    }
    update(){
        
        if (this.dashOn == true){
            if (this.dureDeDash <= 0 ){
                this.dureDeDash = this.dureDeDash -1;
                this.body.setVelocityX(this.vitesseDeDash);
            }
            else {
                this.dashOn == true
            }
        }
  
    }
 
    
    Stop (){
        if (this.gravite == 0 || this.gravite == 2 ){
            this.body.setVelocityX(0);
        }
        else if (this.gravite == 1 || this.gravite == 3 ){
            this.body.setVelocityY(0);
        }
        
        
    }
    
    Droit (){ 
        if (this.gravite == 0 || this.gravite == 2 ){
            this.body.setVelocityX(this.vitesseDeDeplacement);
            this.lastDirection = 'droit'
        }  
    }
   
    Gauche (){
        if (this.gravite == 0 || this.gravite == 2 ){
            this.body.setVelocityX(-this.vitesseDeDeplacement);
            this.lastDirection = 'gauche'
        }
    } 
    
    Haut (){ 
        if (this.gravite == 1 || this.gravite == 3 ){
            this.body.setVelocityY(-this.vitesseDeDeplacement);
            this.lastDirection = 'haut'
        }  
    }
   
    Bas (){
        if (this.gravite == 1 || this.gravite == 3 ){
            this.body.setVelocityY(this.vitesseDeDeplacement);
            this.lastDirection = 'bas'
        }
    } 
    
    
    
    
    Jump (){
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