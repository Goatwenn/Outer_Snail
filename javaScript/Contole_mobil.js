class Controle_mobil { 
    constructor (){
        
        
        
    }
    
    Create (Scene){
        
    //--- Boutons  :  ----------------------------------------------------------     
        
        // Right
        this.right = Scene.add.sprite(469,600,'Right_arrow')
            .setScrollFactor(0,0)
            .setInteractive()
        
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>{
                this.right.anims.play("Right_arrow_1");
                this.droit = true
            })
        
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>{
                this.right.anims.play("Right_arrow_0");
                this.droit = false
            })
        
        
        
        
       // Left
        this.left = Scene.add.sprite(145,600,'Left_arrow')
            .setScrollFactor(0,0)
            .setInteractive()
        
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>{
                this.left.anims.play("Left_arrow_1");
                this.gauche = true
            })
        
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>{
                this.left.anims.play("Left_arrow_0");
                this.gauche = false
            })
        
        
        
       
      // Up
        this.up = Scene.add.sprite(306,438,'Up_arrow')
            .setScrollFactor(0,0)
            .setInteractive()
        
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>{
                this.up.anims.play("Up_arrow_1");
                this.haut = true
            })
        
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>{
                this.up.anims.play("Up_arrow_0");
                this.haut = false
            })
        
        
       
        
      // Down
        this.down = Scene.add.sprite(307,762,'Down_arrow')
            .setScrollFactor(0,0)
            .setInteractive()
        
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>{
                this.down.anims.play("Down_arrow_1");
                this.bas = true
            })
        
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>{
                this.down.anims.play("Down_arrow_0");
                this.bas = false
            })
        
        
       
        
      // A
        this.toucheA = Scene.add.sprite(1750,762,'A_arrow')
            .setScrollFactor(0,0)
            .setInteractive()
        
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>{
                this.toucheA.anims.play("A_arrow_1");
                this.a = true
            })
        
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>{
                this.toucheA.anims.play("A_arrow_0");
                this.a = false
            })        
        
        
       
        
      // S
        this.toucheS = Scene.add.sprite(1500,762,'S_arrow')
            .setScrollFactor(0,0)
            .setInteractive()
        
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>{
                this.toucheS.anims.play("S_arrow_1");
                this.s = true
            })
        
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () =>{
                this.toucheS.anims.play("S_arrow_0");
                this.s = false
            })        
        
        
        this.boutonGroup = Scene.add.group();
            this.boutonGroup.add(this.toucheA);
            this.boutonGroup.add(this.toucheS);
            this.boutonGroup.add(this.down);
            this.boutonGroup.add(this.up);
            this.boutonGroup.add(this.right);
            this.boutonGroup.add(this.left);
        
        
        
        }
    
    Activation(x){
        if (x == true){
            this.toucheA.y = 0
            console.log('eqsg')
        }
        else{
            this.toucheA.y = 2000
        }
        
    }
    
    
    
    
    
    
}

/*
    this.mobil = new Controle_mobil();
    this.mobil.Create();
        1537 862
        */