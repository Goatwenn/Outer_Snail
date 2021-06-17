class Perso extends Phaser.GameObjects.Sprite{
    
     constructor (scene, x, y, texture){
         super(scene, x, y, texture);
         
         
    //--- Inicialisation :  ----------------------------------------------------------

         scene.add.existing(this);
         scene.physics.world.enableBody(this);
         
         console.log(this) 
         
         this.body.setSize(54,54);
         this.particule = new Particules();
    
         
         this.bouclier = this.scene.add.sprite(this.body.x  ,this.body.y,'bouclier').setDepth(2);
         
      // Variables
         this.dashOn = false
         this.bouclierOn = false
         this.invu = false;
         
         this.sol = false
         this.dsaut = false
         this.sdsaut = false
         this.enMouvement = false
         
         this.gravite = 0;
         
         this.lastDirection = 'droit';
         
         
         
         
      // Satistique du joueur 
         this.hp = 3;
         
         this.invuTimer = 50;
         this.bouclier_Timer = 500;
         
         this.duredash = 50;
         
         
         this.inventaire = 2;
         this.nbfruit = 0;
         
         this.vitesseDeDeplacement = 300;
         this.hauteurDeSaut = 350;
         this.puissanceDeGravite = 400;
         
         this.dashTimer = 0;
         this.dureDeDash = 40;
         this.vitesseDeDash = 700;
          
         
         
         
         
    } // --- Fin du Constructor
    
    Update(){
        
    //--- Dash :  ----------------------------------------------------------
        
        if (this.dashOn == true){
           
            this.dashTimer += 1
        
            this.particule.Flammes(this.scene,"bleu",this.body,27,27);
            
            if (this.lastDirection == 'droit' && this.gravite == 0 || this.lastDirection == 'droit' && this.gravite ==2 ){
                this.body.setVelocityX(900)
                this.anims.play("dash_droit");
            }
            else if (this.lastDirection == 'gauche' && this.gravite == 0 || this.lastDirection == 'gauche' && this.gravite ==2){
                this.body.setVelocityX(-800)
                this.anims.play("dash_gauche");
            }
            else if (this.lastDirection == 'haut' && this.gravite == 1 || this.lastDirection == 'haut' && this.gravite == 3){
                this.body.setVelocityY(-800)
                this.anims.play("dash_droit");
            }
            else if (this.lastDirection == 'bas' && this.gravite == 1 || this.lastDirection == 'bas' && this.gravite == 3){
                this.body.setVelocityY(800)
                this.anims.play("dash_gauche");
            }
            
            
            
            if (this.dashTimer >= this.duredash){
                this.dashTimer = 0
                this.inventaire = 0
                this.dashOn = false
                
                if (this.lastDirection == 'droit' || this.lastDirection == 'haut'){
                this.anims.play("SR");   
                }
                
                if (this.lastDirection == 'gauche' || this.lastDirection == 'bas'){
                this.anims.play("SL");   
                }
            }
 
        }
  
        
        
     //--- Bouclier :  --------------------------------------------------------       
        
        this.bouclier.x = this.body.x + 27
        this.bouclier.y = this.body.y + 27
        this.bouclier.angle += 20
        
        if (this.bouclierOn ){
            this.bouclier_Timer -=  1
            
            if(this.bouclier_Timer <= 500 && this.bouclier_Timer >= 499){
              this.bouclier.anims.play("bouclier_Up");  
                
            }
            
            if(this.bouclier_Timer <= 152 && this.bouclier_Timer >= 150){
              this.bouclier.anims.play("bouclier_Alerte");  
                
            }
            
            if(this.bouclier_Timer <= 0){
                this.bouclierOn = false
                this.bouclier_Timer = 500
                this.inventaire = 0
                this.bouclier.anims.play("bouclier_Down");
            }
        }
        
        
        
    //--- Particules :  --------------------------------------------------------
        
        if( this.enMouvement && this.sol){
                this.particule.Frotement(this.scene,"vert",this.body,27,27);
        }
        
        
 
        
    //--- Invicibilité :  ----------------------------------------------------------
        
        if  (this.invu == true){
            
            this.invuTimer -=  1
            
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
                    this.enMouvement = true
                    if (this.lastDirection == 'gauche'|| this.lastDirection == 'bas'){
                        this.anims.play("SR");
                    }
                this.lastDirection = 'droit'    
                }
                else if (G){
                    this.body.setVelocityX(-this.vitesseDeDeplacement)
                    this.enMouvement = true
                    if (this.lastDirection == 'droit' || this.lastDirection == 'haut'){
                        this.anims.play("SL");         
                    }
                this.lastDirection = 'gauche'    
                }
                else if (!H && !B){
                    this.body.setVelocityX(0)    
                    this.enMouvement = false
                }
            }
            
            else if(this.gravite == 1 || this.gravite == 3){ 
                
                if(B){
                    this.body.setVelocityY(this.vitesseDeDeplacement)
                    this.enMouvement = true
                        if (this.lastDirection == 'droit' || this.lastDirection == 'haut'){
                        this.anims.play("SL");
                    } 
                this.lastDirection = 'bas'
                } 
                else if (H){
                    this.body.setVelocityY(-this.vitesseDeDeplacement)
                    this.enMouvement = true
                    if (this.lastDirection == 'gauche' || this.lastDirection == 'bas'){
                        this.anims.play("SR");
                    }
                this.lastDirection = 'haut'
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
        else if (this.inventaire == 2){
            this.bouclierOn = true
            console.log('Joueur Utilisation Dash')
        }
    }
    
    
    
    
    
//--- Vie :  ----------------------------------------------------------
    
    Vie(ennemi){
        if (!this.invu && !this.dashOn && !this.bouclierOn){
            
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
        this.body.x = 486 
        this.body.y = 1730
        
        this.inventaire = 0
        this.dashOn = false
        this.bouclierOn = false
        this.bouclier_Timer = 500
        this.bouclier.anims.play("bouclier_Down");
        
        this.scene.barreDeVie.anims.play("vie" + this.hp);
 
    }
    
}