class Particules { 
    constructor (){
        
        this.timer = 0;

    }
    
    
    Frotement(Scene, Texture, Target, FoX, FoY){
     
        this.scene = Scene ;
        this.texture = Texture ;
        this.target = Target ;
        this.foX = FoX ;
        this.foY = FoY ;
        
        this.timer = this.timer + 1
        this.delay = 5;
        
        if (this.timer >= this.delay){
            this.timer = 0
            this.nb =  Phaser.Math.Between(1, 2)
            
            var particles = this.scene.add.particles(this.texture + this.nb);
            
            var emitter = particles.createEmitter({
 
                follow : this.target,
                followOffset : {x : this.foX, y : this.foY},
                
        // --------------------------------------------------
                
                lifespan :500, 
                
                gravityX : this.target.gravity.x,
                gravityY : this.target.gravity.y,
                
                speedY: {min: -60, max: 60}, //* -(this.target.gravity.y/puissanceDeGravite),
                speedX: {min: -60, max: 60}, //* -(this.target.gravity.x/puissanceDeGravite),
                
                maxParticles: 1,
                
        // --------------------------------------------------
                blendMode: 'COLOR_BRUN',
            }); 
        }
    }   
    
    
   
    Flammes(scene, texture, target, foX, foY ){
        
        console.log ("FX Dash")
            
        this.nb =  Phaser.Math.Between(1,2)

        var particles = scene.add.particles(texture + this.nb);

        

        var emitter = particles.setDepth(0).createEmitter({

            follow : target,
            followOffset : {x : foX, y : foY},
    // --------------------------------------------------        

            lifespan :700, 

            gravityX : target.gravity.x,
            gravityY : target.gravity.y,

            scale: {start: 1.5, end: 0.3},

            speedY: {min: -60, max: 60},
            speedX: {min: -60, max: 60},

            maxParticles: 15,

            delay: 0,

    // --------------------------------------------------
            blendMode: 'COLOR_BRUN',
        }); 
    } 
    
    
    
 
    
    
    
    
}// fin de class         

        
/* --------------------------------------------------------------------------------


    Information:
    
Frotement:

    this.particule.Frotement(

        this.scene,     // Scenne
        "vert",         // Couleur
        this.body,      // Target
        0,              // OffSet X
        0,              // OffSet Y

    ); 




Integration:

    this.particule = new Particules();
    this.particule.Frotement();
        
*///-------------------------------------------------------------------------------