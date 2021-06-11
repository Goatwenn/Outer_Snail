class Controle_mobil { 
    constructor (){
    
        //this.barreDeVie = this.physics.add.sprite(200, 1000, 'vie').setScrollFactor(0,0);
        
        
        
    }
    
    Create (scene){
        console.log(this)
        
        this.Down_arrow = scene.add.image(1537,862,'Down_arrow').setScrollFactor(0,0).setDepth(3);
        this.Up = scene.add.image(1536,538,'Up_arrow').setScrollFactor(0,0).setDepth(3);
        this.Right = scene.add.image(1699,700,'Right_arrow').setScrollFactor(0,0).setDepth(3);
        this.Ledt = scene.add.image(1375,700,'Left_arrow').setScrollFactor(0,0).setDepth(3);
        
        this.Down_arrow.on('pointerdown', function (pointer) {

            console.log('down')
            
        });
   
    }
    
    
    
    
    
    
    
    
    
}



/*
    this.mobil = new Controle_mobil();
    this.mobil.Create();
        
        */