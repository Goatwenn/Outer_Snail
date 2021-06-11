class Controle_mobil { 
    constructor (){
    
        //this.barreDeVie = this.physics.add.sprite(200, 1000, 'vie').setScrollFactor(0,0);
        
        
        
    }
    
    Create (scene){
        console.log(this)
        
        this.Down_arrow = scene.add.image(960,540,'Down_arrow').setScrollFactor(0,0);
        
        scene.input.on('pointerdown', function (pointer) {

            console.log('this')
            
        });
   
    }
    
    
    
    
    
    
    
    
    
}



/*
    this.mobil = new Controle_mobil();
    this.mobil.Create();
        
        */