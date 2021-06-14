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
        
        this.rock;
        
        this.hideVerif = 0
        this.rock_chaine == false
        this.rayonAction = 850;
        
         this.dead = false ;
    }
    
    Update(){ 
        
        if (this.rock){
            this.rock.Update();
        }
        
        
        
         if(this.scene.player.x <= this.body.x + this.rayonAction && this.scene.player.x > this.body.x ){
             this.Hide(false)
             //console.log("cacher")
        }
        else {
            this.Hide(true)  
            //console.log(" pas cacher")
        }
    }
    

    
    Hide (A){
        this.hide = A
        
        if (this.hide == false && !this.dead){
            if (this.hideVerif == 0){
                this.anims.play('hide', true);   
                
                this.rock = new Rock(this.scene, this.body.x, this.body.y + 27, 'rock');
                
                this.hideVerif = 1
            }  
        }
        
        if (this.hide == true && !this.dead){
            if (this.hideVerif == 1){
                this.anims.play('un_hide', true); 
                
                this.hideVerif = 0
            }
              
        }
        
    }
    
    
    
    
    Dead(){
        console.log('Thrower Dead')
        this.dead = true
        this.body.destroy(true, true);
        
    }
    
    
}