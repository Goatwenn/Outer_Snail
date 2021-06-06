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
        
         this.lastDirection = 'droit';
         this.animeLastdirection = 2;
         
         this.hp = 3;
         this.invu = false;
         this.invuTimer = 50;
         
         this.inventaire = 0;
         
         this.vitesseDeDeplacement = 300;
         this.hauteurDeSaut = 350;
         this.puissanceDeGravite = 400;
         
         this.dashTimer = 0;
         this.dureDeDash = 30;
         this.vitesseDeDash = 800;
          
    }
    
    update(){
        
        if (this.dashOn == true){
           
            this.dashTimer = this.dashTimer + 1
           
           
            if(this.gravite == 0 || this.gravite == 2){
                if (this.lastDirection == "droit"){
                    this.body.setVelocityX(this.vitesseDeDash);
                }
                else if (this.lastDirection == "gauche"){
                this.body.setVelocityX(-this.vitesseDeDash);
                }
            }
           
           
            if (this.lastDirection == "haut"){
                this.body.setVelocityY(-this.vitesseDeDash);
            }
            else if (this.lastDirection == "bas"){
                this.body.setVelocityY(this.vitesseDeDash);
            }
           
    
           
            if (this.dashTimer >= this.dureDeDash){
                this.dashOn = false
                this.inventaire = 0
                this.dashTimer = 0 
            }
        }
  
        
        
        
        
        
        if  (this.invu == true){
            
            this.invuTimer = this.invuTimer - 1
            
            if(this.invuTimer <= 0){
                this.invu = false
                this.invuTimer = 50
            }
        }
        

        
        
        
        if (this.body.y >= 2000 ){
            this.Dead() 
        }
        
        
        
        if (this.gravite == 0){
            
        
            
            
            if (this.body.blocked.down){
                this.sol = true
                this.dsaut = false
                this.sdsaut = true   
            
            }
        }
        else if (this.gravite == 1){
            
            if (this.body.blocked.right){
                this.sol = true
                this.dsaut = false
                this.sdsaut = true   
            
            }
        }
        else if (this.gravite == 2){
   
            if (this.body.blocked.up){
                this.sol = true
                this.dsaut = false
                this.sdsaut = true   
            
            }
        }
        else if (this.gravite == 3){
            
            if (this.body.blocked.left){
                this.sol = true
                this.dsaut = false
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
 
    
    Vie(){
        this.hp = this.hp - 1
        this.invu = true
        //console.log('Joueur Degat')

        if(this.hp <= 0){
            this.Dead()
            console.log(this)
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
                if (this.lastDirection == 'gauche'|| this.lastDirection == 'bas'){
                    this.anims.play("SR");
                    this.lastDirection = 'droit'
                }
            } 
        }
    }
   
    Gauche (){
        if (this.dashOn == false){
            if (this.gravite == 0 || this.gravite == 2 ){
                this.body.setVelocityX(-this.vitesseDeDeplacement);
                if (this.lastDirection == 'droit' || this.lastDirection == 'haut'){
                    this.anims.play("SL");
                    this.lastDirection = 'gauche'
                }   
            }
        }
    } 
    
    Haut (){ 
        if (this.dashOn == false){
            if (this.gravite == 1 || this.gravite == 3 ){
                this.body.setVelocityY(-this.vitesseDeDeplacement);
                if (this.lastDirection == 'gauche' || this.lastDirection == 'bas'){
                    this.anims.play("SR");
                    this.lastDirection = 'haut'
                }
            }  
        }
    }
   
    Bas (){
        if (this.dashOn == false){
            if (this.gravite == 1 || this.gravite == 3 ){
                this.body.setVelocityY(this.vitesseDeDeplacement);
                if (this.lastDirection == 'droit' || this.lastDirection == 'haut'){
                    this.anims.play("SL");
                    this.lastDirection = 'bas'
                }
            }
        }
    } 
    
    
    noJump (){
        this.space = false
    }

    Jump (){
        this.space = true
        
    } 
    
    Loot (x){
        this.items = x
        
        if (this.inventaire == 0){
            if (this.items == "dash"){
                console.log('Joueur Loot Dash')
                this.inventaire = 1
            }
        
            if (this.items == "shield"){
                console.log('Joueur Loot Shield')
                this.inventaire = 2
            }
        }
        
    }
    
    
    Pouvoir (){
        if (this.inventaire == 1){
            this.dashOn = true
            console.log('Joueur Utilisation Dash')
        }
        
        if (this.inventaire == 2){
            this.invu = true
            console.log('Joueur Utilisation Shield')
            this.inventaire = 0
        }
    }
    
    
    
    Gravite_Rouge(){
        this.body.setGravityY(0) 
        this.body.setGravityX(-this.puissanceDeGravite)  
        
        this.flipX = true ;
        this.angle = 90;
        
        this.gravite = 3   
    }
    
    
    Gravite_Bleu(){
        this.body.setGravityY(-this.puissanceDeGravite)  
        this.body.setGravityX(0) 
        
        this.flipX = true ;
        this.angle = 180;
        
        this.gravite = 2
    }
    
    
    Gravite_Vert(){
        this.body.setGravityY(0)
        this.body.setGravityX(this.puissanceDeGravite)  
        
        this.flipX = false ;
        this.angle = -90;
        
        this.gravite = 1
    }
    
    
    Gravite_Blanc(){
        
        this.body.setGravityY(this.puissanceDeGravite)  
        this.body.setGravityX(0) 
        
        this.flipX = false ;
        this.angle = 0;
        
        this.gravite = 0
    }
    
    
    Dead (){
        console.log('Joueur Mort')
        this.body.x = 300
        this.body.y = 1800
        this.hp = 3
    }
    
}