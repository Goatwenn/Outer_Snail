class Particules { 
    constructor (){
        
        this.timer = 0;
        
        
    }
    
    
    Frotement(Scene, texture, target,foX,foY, Gx,Gy, delay, radial){
     
        this.timer = this.timer + 1
        this.delay = delay;
        
        if (this.timer >= this.delay){
            this.timer = 0
            this.image = texture + Phaser.Math.Between(1, 2)
            
            var particles = Scene.add.particles(this.image);
            
            var emitter = particles.createEmitter({
 
                gravityX : Gx,
                gravityY : Gy,

                
                follow : target,
                followOffset : (foX , foY),
                
                lifespan :500 , 
                radial : radial,
                speed: 100,
                maxParticles: 1,
                blendMode: 'COLOR_BRUN',
            }); 
            
            
            
            /*
            this.particule.Frotement(
                
                this.scene, // Scenne
                "pv",       // P = Particule + Couleur (v b r O )
                
                this.body,  // Target
                0,          // OffSet X
                0,          // OffSet Y
                
                this.graviteDuJoueurX,   // GraviteX
                this.graviteDuJoueurY,   // GraviteY
                
                10,         // Delay D'apparition
                false,      // Radial
            );
            
            */
            
            
            
            
            
            
            
            
            
            
            
            
        }
        
        
        
        
        
        
        
        
    }
    
    
    
  
}
      
/*
    this.particule = new Particules();
    this.particule.Frotement();
        
        */