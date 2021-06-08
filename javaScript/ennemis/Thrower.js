class Thrower extends Phaser.GameObjects.Sprite{
    
    constructor (scene, x, y, texture ){
        super(scene, x, y, texture);
         
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
         
        console.log(this) 
         
        this.body.setGravityY(puissanceDeGravite)
        this.body.immovable = true;
        this.body.setSize(54,54);
        this.body.setOffset(27,[54]);
        
        this.hideVerif = 0
        
        this.rayonAction = 850;
        
         this.dead = false ;
    }
    
    update(x, y){ 
        
        this.playerX = x
        this.playerY = y
          
         if(this.playerX <= this.body.x + this.rayonAction && this.playerX > this.body.x ){
            this.Lancer()
             this.Hide(false)
             console.log("cacher")
        }
        else {
            this.Hide(true)  
            console.log(" pas cacher")
        }
    }
    
    
    Lancer(){
        
    }
    
    Hide (A){
        this.hide = A
        
        if (this.hide == false){
            if (this.hideVerif == 0){
                this.anims.play('hide', true);   
                
                this.hideVerif = 1
            }  
        }
        
        if (this.hide == true){
            if (this.hideVerif == 1){
                this.anims.play('un_hide', true); 
                
                this.hideVerif = 0
            }
              
        }
        
    }
    
    
    
    
}