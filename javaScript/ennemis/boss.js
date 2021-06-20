class Boss extends Phaser.GameObjects.Sprite{
    
     constructor (scene, x, y, texture){
         super(scene, x, y, texture);
         
         this.scene = scene;
         this.startBoss = x;
         
         scene.add.existing(this);
         scene.physics.world.enableBody(this);
        
         
         
         console.log(this); 
         this.body.setSize(54,54);
         this.body.immovable = true;
  
         
         this.point_droit ;
         this.point_droit = this.scene.add.zone(this.x + 400, 1511).setSize(200,200);
         this.scene.physics.world.enable(this.point_droit);
         this.point_droit.body.immovable = true;
         
         this.point_gauche ;
         this.point_gauche = this.scene.add.zone(this.x - 400, 1511).setSize(200,200);
         this.scene.physics.world.enable(this.point_gauche);
         this.point_gauche.body.immovable = true;
          
            
         this.scene.physics.add.collider(this.scene.player, this.point_droit, this.scene.Dommage, null, this.scene); 
         this.scene.physics.add.collider(this.scene.player, this.point_gauche, this.scene.Dommage, null, this.scene); 
         
         
         
         
         this.actiontimer = 0;
         this.boss_pv = 9;
         this.boss_phase = 1;
         
         
         
    }
    
    
    
    Update (){
        
        if (this.scene.player.x >= this.startBoss){       
            this.scene.cameras.main.startFollow(this.body,true,0.08,0.08);
            this.startBoss = 0
            
            
            if (this.body.y >= 1485){
                this.body.setVelocityY(-100)
                this.scene.cameras.main.shake(50, 0.002)
            }
            else{
                this.body.setVelocityY(0)
                this.Move();
                
                this.actiontimer = this.actiontimer + 1
                
                if (this.actiontimer >= 150){
                    this.Phase(this.boss_phase)
                    this.actiontimer = 0
                }
                
            }
        }
    }
    
    
    
    Move(){
        
        this.point_droit.x = this.body.x + 400
        this.point_gauche.x = this.body.x - 300
        
        if (this.body.x <= 3777 ){
            this.direction = true
            }
        else if (this.body.x >= 5550 ){
            this.direction = false
        }
        
        if (this.direction ){
            this.body.x += 2
        }
        else{
            this.body.x -= 2
        }
    
    }
        
        
    Phase(numero){
        if (numero == 1 ){
           console.log ("a") 
        }  
        
        else if (numero == 2 ){
           console.log ("b") 
        } 
        
        else if (numero == 3 ){
           console.log ("bc") 
        } 
    }
    
    Dead(){
        console.log("touche boss")
        
        this.boss_pv -= 1
        
        if (this.boss_pv == 6) {
            this.boss_phase = 2
        }
        else if (this.boss_pv == 3) {
            this.boss_phase = 3
        }
        
        
        if(this.boss_pv == 0){
            this.body.destroy(true, true);
        }
        
    }
            
            
            
        
    
}