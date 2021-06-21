class Boss extends Phaser.GameObjects.Sprite{
    
     constructor (scene, x, y, texture){
         super(scene, x, y, texture);
         
         this.scene = scene;
         this.startBoss = x;
         
         scene.add.existing(this);
         scene.physics.world.enableBody(this);
        
         
         
         
         console.log(this); 
         this.body.setSize(200,200);
         this.body.immovable = true;
  
         
         this.point_droit ;
         this.point_droit = this.scene.add.image(this.x + 400, 1511, 'boss_point').setSize(200,200);
         this.scene.physics.world.enable(this.point_droit);
         this.point_droit.body.immovable = true;
         
         this.point_gauche ;
         this.point_gauche = this.scene.add.image(this.x - 400, 1511, 'boss_point').setSize(200,200);
         this.scene.physics.world.enable(this.point_gauche);
         this.point_gauche.body.immovable = true;
         this.point_gauche.flipX = true ;
          
            
         this.scene.physics.add.collider(this.scene.player, this.point_droit, this.scene.Dommage, null, this.scene); 
         this.scene.physics.add.collider(this.scene.player, this.point_gauche, this.scene.Dommage, null, this.scene); 
         
         
         
            
         this.actiontimer = 0;
         this.boss_pv = 3;
         this.attaque_point_droit = false
         
         this.invuTimer = 50
         this.invu = false 
         
         this.point_droit_vie = true
         this.point_gauche_vie = true
         
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
                this.Phase(this.boss_phase)
                
                if (this.scene.player.x <= 700){
                    this.scene.player.x = this.body.x
                    this.scene.player.y = 1860
                }
                
                
            }
            
            
            
            if  (this.invu == true){
                this.invuTimer -=  1
                if(this.invuTimer <= 0){
                    this.invu = false
                    this.invuTimer = 50
                }
            }
            
            
            
            
            
            
            
            
            
            if (this.attaque_point_droit) { 
                if (this.action_droit && this.point_droit.y <= 1800){
                    this.point_droit.y += 5     
                }
                else if (!this.action_droit && this.point_droit.y >= 1511) {
                    this.point_droit.y -= 5
                }
                if(this.point_droit.y >= 1800){
                    this.action_droit = false
                }       
            }
            
            if (this.attaque_point_gauche) { 
                if (this.action_gauche && this.point_gauche.y <= 1800){
                    this.point_gauche.y += 5     
                }
                else if (!this.action_gauche && this.point_gauche.y >= 1511) {
                    this.point_gauche.y -= 5
                }
                if(this.point_gauche.y >= 1800){
                    this.action_gauche = false
                }       
            } 
        }
    }
    
    
    
    Move(){
        
        this.point_droit.x = this.body.x + 400
        this.point_gauche.x = this.body.x - 300
        
        if (this.body.x <= 3646 ){
            this.direction = true
            }
        else if (this.body.x >= 5250 ){
            this.direction = false
        }
        
        if (this.direction ){
            this.body.x += 2
        }
        else{
            this.body.x -= 2
        }
    
    }
        
        
    Phase(){
        if (this.point_droit_vie && this.scene.player.x >= this.point_droit.x-100 && this.scene.player.x <= this.point_droit.x + 100){
            this.attaque_point_droit = true
            this.action_droit = true
        }

        if (this.point_gauche_vie && this.scene.player.x >= this.point_gauche.x-100 && this.scene.player.x <= this.point_gauche.x + 100){
            this.attaque_point_gauche = true
            this.action_gauche = true
        }
    }
        
    Dead(){
        
        if (!this.invu){
            this.boss_pv -= 1
            this.invu = true
        }
        
        
        if (this.boss_pv == 1) {
            this.point_droit.destroy(true, true);
            
        }
    
        
        if(this.boss_pv == 0){
            this.point_gauche.destroy(true, true);
            this.body.destroy(true, true);
        }
        
    }
            
            
            
        
    
}