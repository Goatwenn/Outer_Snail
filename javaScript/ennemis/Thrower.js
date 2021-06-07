class Thrower extends Phaser.GameObjects.Sprite{
    
     constructor (scene, x, y, texture ){
         super(scene, x, y, texture);
         
         scene.add.existing(this);
         scene.physics.world.enableBody(this);
         
         console.log(this) 

         this.body.setSize(54,54);
         this.dead = false ;

  
    }
}