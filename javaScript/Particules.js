class Particules { 
    constructor (){
        
        this.timer = 0;
        
        
    }
    
    
    Frotement(Scene, texture, target, foX, foY){
     
        this.timer = this.timer + 1
        this.delay = 10;
        
        if (this.timer >= this.delay){
            this.timer = 0
            this.nb =  Phaser.Math.Between(1, 2)
            
            var particles = Scene.add.particles('particule_' + texture + this.nb);
            
            var emitter = particles.createEmitter({
 
                follow : target,
                
                followOffset : {x : foX, y : foY},
                
                angle: {min : 90, max : 0},
                
                lifespan :500, 
                
                gravityX : target.gravity.x,
                gravityY : target.gravity.y,
                
                speedY: 100 * -(target.gravity.y/puissanceDeGravite),
                speedX: 100 * -(target.gravity.x/puissanceDeGravite),
                
                maxParticles: 1,
                
                blendMode: 'COLOR_BRUN',
            }); 
            
            
            
            /*
            this.particule.Frotement(
                
                this.scene, // Scenne
                "vert",       // P = Particule + Couleur
                this.body,  // Target
                0,          // OffSet X
                0,          // OffSet Y
                
            );
            
            
            
            '\n'
            
            */
            
            
            
            
            
            
            
            
            
            
            
            
        }
        
        
        
        
        
        
        
        
    }
    
    
    
  
}
      
/*
    this.particule = new Particules();
    this.particule.Frotement();
        
        */