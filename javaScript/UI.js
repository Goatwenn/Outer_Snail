class Menu extends Phaser.Scene {  // Copier Coller a modifier

    constructor (){
        super("Menu");   // Copier Coller a modifier
    }
    init(data){
        
    }
   
    create (){
    
       this.barreDeVie = this.physics.add.sprite(200,1000, 'vie').setScrollFactor(0,0); 
        
        
    }
}