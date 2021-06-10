class Perso extends Phaser.GameObjects.Sprite{
    
     constructor (scene, x, y, texture){
         super(scene, x, y, texture);
         
         
    //--- Inicialisation :  ----------------------------------------------------------

         scene.add.existing(this);
         scene.physics.world.enableBody(this);
         
         console.log(this) 
         
         this.body.setSize(54,54);
         this.particule = new Particules();
         
         
      // Variables
         this.dashOn = false
         this.invu = false;
         
         this.sol = false
         this.dsaut = false
         this.sdsaut = false
         this.enMouvement = false
         
         this.gravite = 0;
         
         this.lastDirection = 'droit';
         
         
      // Sattistique du joueur 
         this.hp = 3;
         
         this.invuTimer = 50;
         
         this.dashTimer = 0;
         this.dureDeDash = 30;
         this.vitesseDeDash = 800;
         
         this.inventaire = 0;
         this.nbfruit = 0;
         
         this.vitesseDeDeplacement = 300;
         this.hauteurDeSaut = 350;
         this.puissanceDeGravite = 400;
         
         this.dashTimer = 0;
         this.dureDeDash = 30;
         this.vitesseDeDash = 800;
          
         
         
         
         
    } // --- Fin du Constructor
    
    Update(){
        
    //--- Dash :  ----------------------------------------------------------
        
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
  
        
        
    
        
    //--- Particules :  --------------------------------------------------------
        
         if( this.enMouvement && this.sol){
            this.particule.Frotement(
                this.scene, // Scenne
                "vert",       // P = Particule + Couleur
                this.body,  // Target
                27,          // OffSet X
                54,          // OffSet Y
            );
        }
        
        
 
        
    //--- Invicibilité :  ----------------------------------------------------------
        
        if  (this.invu == true){
            
            this.invuTimer = this.invuTimer - 1
            
            if(this.invuTimer <= 0){
                this.invu = false
                this.invuTimer = 50
            }
        }
        
        
        
        
        
    //--- Limite de Map :  ----------------------------------------------------------
        
        if (this.body.y >= 2160 || this.body.y <= 0 || this.body.x >= 8000 || this.body.x <= 0 ){
            this.Dead() 
        }
        
        
        
        
        
    //--- Reset de saut :  ----------------------------------------------------------
        
        if (this.gravite == 0 && this.body.blocked.down ||
            this.gravite == 1 && this.body.blocked.right ||
            this.gravite == 2 && this.body.blocked.up ||
            this.gravite == 3 && this.body.blocked.left
           ){
            
            this.sol = true
            this.dsaut = false
            this.sdsaut = true  
        }
        else {
            this.sol = false
        }
    
    }// --- Fin du Update
 
    
    
    
//--- Gravité :  ----------------------------------------------------------    
    
    Gravite(Couleur){
        
        if (Couleur == 'rouge'){
            
            this.body.setGravityY(0) 
            this.body.setGravityX(-puissanceDeGravite)

            this.flipX = true ;
            this.angle = 90;

            this.gravite = 3  
            
        }
        else if (Couleur == 'bleu'){
            
            this.body.setGravityY(-puissanceDeGravite)  
            this.body.setGravityX(0)

            this.flipX = true ;
            this.angle = 180;

            this.gravite = 2
            
        }
        else if (Couleur == 'vert'){
            
            this.body.setGravityY(0)
            this.body.setGravityX(puissanceDeGravite)  

            this.flipX = false ;
            this.angle = -90;

            this.gravite = 1
            
        }
        else if (Couleur == 'blanc'){
        
            this.body.setGravityY(puissanceDeGravite)  
            this.body.setGravityX(0) 

            this.flipX = false ;
            this.angle = 0;

            this.gravite = 0
        }
    }
    
    
    
    
    
//--- Deplacements :  ----------------------------------------------------------
    
    Deplacement(D,G,H,B,S){ //Droit - gauche - haut - bas - space
        
        if(!this.dashOn){
            
            if(this.gravite == 0 || this.gravite == 2){
                
                if(D){
                    this.body.setVelocityX(this.vitesseDeDeplacement)
                    if (this.lastDirection == 'gauche'|| this.lastDirection == 'bas'){
                        this.anims.play("SR");
                        this.lastDirection = 'droit'
                    }
                }
                else if (G){
                    this.body.setVelocityX(-this.vitesseDeDeplacement)
                    if (this.lastDirection == 'droit' || this.lastDirection == 'haut'){
                        this.anims.play("SL");
                        this.lastDirection = 'gauche'
                    }
                }
                else if (!H && !B){
                    this.body.setVelocityX(0)    
                    this.enMouvement = false
                }
            }
            
            else if(this.gravite == 1 || this.gravite == 3){ 
                
                if(B){
                    this.body.setVelocityY(this.vitesseDeDeplacement)
                        if (this.lastDirection == 'droit' || this.lastDirection == 'haut'){
                        this.anims.play("SL");
                        this.lastDirection = 'bas'
                    }     
                } 
                else if (H){
                    this.body.setVelocityY(-this.vitesseDeDeplacement) 
                    if (this.lastDirection == 'gauche' || this.lastDirection == 'bas'){
                        this.anims.play("SR");
                        this.lastDirection = 'haut'
                    }
                }
                else if(!G && !D){
                    this.body.setVelocityY(0)    
                    this.enMouvement = false
                } 
            }
        }
        
 //--- Saut :  ----------------------------------------------------------
        
        if (S && this.sol){
   
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
        
        
        if (!S && !this.sol && this.sdsaut){
            this.dsaut = true
        }
        
        
        if (S && !this.sol && this.dsaut){
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
    
  
    

    
    
//--- Loot :  ----------------------------------------------------------
    
    Loot (item){
        
        if (this.inventaire == 0){
            if (item == 'dash'){
                console.log('Joueur Loot Dash')
                this.inventaire = 1
            }
            if (item == 'shield'){
                console.log('Joueur Loot Shield')
                this.inventaire = 2
            }
            
        }
        
    }
    
    
    
    
    
//--- Pouvoir :  ----------------------------------------------------------
    
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
    
    
    
    
    
//--- Vie :  ----------------------------------------------------------
    
    Vie(ennemi){
        if (!this.invu && !this.dashOn){
            
            console.log('Joueur - 1hp ' + (this.hp - 1) + '/3')
            this.scene.barreDeVie.anims.play("vie" + (this.hp - 1));
            this.scene.cameras.main.shake(50, 0.02)
            
            this.hp -= 1
            this.invu = true
            if (this.hp <= 0){
                this.Dead();
            }
        }
        
        else if (this.dashOn) {
            ennemi.Dead();
            
        }
        
        
    }
    
    
    
    
    
//--- Dead :  ----------------------------------------------------------
    
    Dead (){
        console.log('Joueur Mort')
        
        this.hp = 3
        this.body.x = 300
        this.body.y = 1800
        
        this.scene.barreDeVie.anims.play("vie" + this.hp);
        
    }
    
}