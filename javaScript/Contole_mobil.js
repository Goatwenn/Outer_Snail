class Controle_mobil { 
    constructor (){
        
        
        
    }
    
    Create (Scene){
        
    //--- Boutons  :  ----------------------------------------------------------     
        
        if(controle_mobiles)   {
        
        
            // Right
            this.right = Scene.add.sprite(469,500,'button_Right')
                .setScrollFactor(0,0)
                .setDepth(3)
                .setInteractive()

                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>{
                    this.right.anims.play("button_Right_1");
                    this.droit = true
                })

                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>{
                    this.right.anims.play("button_Right_0");
                    this.droit = false
                })




           // Left
            this.left = Scene.add.sprite(145,500,'button_Left')
                .setScrollFactor(0,0)
                .setDepth(3)
                .setInteractive()

                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>{
                    this.left.anims.play("button_Left_1");
                    this.gauche = true
                })

                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>{
                    this.left.anims.play("button_Left_0");
                    this.gauche = false
                })




          // Up
            this.up = Scene.add.sprite(306,338,'button_Up')
                .setScrollFactor(0,0)
                .setDepth(3)
                .setInteractive()

                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>{
                    this.up.anims.play("button_Up_1");
                    this.haut = true
                })

                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>{
                    this.up.anims.play("button_Up_0");
                    this.haut = false
                })




          // Down
            this.down = Scene.add.sprite(307,662,'button_Down')
                .setScrollFactor(0,0)
                .setDepth(3)
                .setInteractive()

                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>{
                    this.down.anims.play("button_Down_1");
                    this.bas = true
                })

                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>{
                    this.down.anims.play("button_Down_0");
                    this.bas = false
                })




          // A
            this.toucheA = Scene.add.sprite(1750,662,'button_A')
                .setScrollFactor(0,0)
                .setDepth(3)
                .setInteractive()

                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>{
                    this.toucheA.anims.play("button_A_1");
                    this.a = true
                })

                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>{
                    this.toucheA.anims.play("button_A_0");
                    this.a = false
                })        




          // S
            this.toucheS = Scene.add.sprite(1500,662,'button_S')
                .setScrollFactor(0,0)
                .setDepth(3)
                .setInteractive()

                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>{
                    this.toucheS.anims.play("button_S_1");
                    this.s = true
                })

                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>{
                    this.toucheS.anims.play("button_S_0");
                    this.s = false
                })       
        }
    }
}

/*
    this.mobil = new Controle_mobil();
    this.mobil.Create();
        1537 862
        */