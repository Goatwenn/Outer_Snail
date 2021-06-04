class BarreDeVie extends Phaser.GameObjects.Sprite{
    
     constructor (scene, x, y, texture ){
         super(scene, x, y, texture);
         
         scene.add.existing(this);
         scene.physics.world.enableBody(this);
         
         console.log(this) 
   
    }
    
    Anim(HP){
        this.hp = HP
        this.anims.play("vie" + this.hp );
    }
    
}