class Menu extends Phaser.Scene {  // Copier Coller a modifier

    constructor (){
        super("Menu");   // Copier Coller a modifier
    }
    init(data){
        
    }
   
    create (){

        this.cursors = this.input.keyboard.createCursorKeys();
       
        this.pointerS = this.physics.add.sprite(1920, 200, 'particule_sang_1');
        this.pointerT = this.physics.add.sprite(960, 540, 'particule_sang_1');
        this.pointerF = this.physics.add.sprite(1520, 740, 'particule_sang_1');
        this.pointerE = this.physics.add.sprite(960, 540, 'particule_sang_1');
        this.pointerC = this.physics.add.sprite(960, 540, 'particule_sang_1');
        
        
        
        this.graphics1 = this.add.graphics();
        
        this.follower1 = { t: 0, vec: new Phaser.Math.Vector2() };

        this.path1 = new Phaser.Curves.Path();
        this.path1.add(new Phaser.Curves.Ellipse(0, 200, 10));

        this.tweens.add({
            targets: this.follower1,
            t: 1,
            ease: 'Sine.easeInOut',
            duration: 6000,
            yoyo: true,
            repeat: -1
        });
        
        
        
        this.graphics2 = this.add.graphics();
    
        this.follower2 = { t: 0, vec: new Phaser.Math.Vector2() };

        this.path2 = new Phaser.Curves.Path();
        this.path2.add(new Phaser.Curves.Ellipse(960, 1300, 20));

        this.tweens.add({
            targets: this.follower2,
            t: 1,
            ease: 'Sine.easeInOut',
            duration: 12000,
            yoyo: true,
            repeat: -1
        });
        
        
        
        this.graphics3 = this.add.graphics();
    
        this.follower3 = { t: 0, vec: new Phaser.Math.Vector2() };

        this.path3 = new Phaser.Curves.Path();
        this.path3.add(new Phaser.Curves.Ellipse(20, 540, 20));

        this.tweens.add({
            targets: this.follower3,
            t: 1,
            ease: 'Sine.easeInOut',
            duration: 3000,
            yoyo: true,
            repeat: -1
        });
        
        
        this.graphics4 = this.add.graphics();
    
        this.follower4 = { t: 0, vec: new Phaser.Math.Vector2() };

        this.path4 = new Phaser.Curves.Path();
        this.path4.add(new Phaser.Curves.Ellipse(1920, 1080, 400));

        this.tweens.add({
            targets: this.follower4,
            t: 1,
            ease: 'Sine.easeInOut',
            duration: 50000,
            yoyo: true,
            repeat: -1
        });
        
        
        
        this.graphics5 = this.add.graphics();
    
        this.follower5 = { t: 0, vec: new Phaser.Math.Vector2() };

        this.path5 = new Phaser.Curves.Path();
        this.path5.add(new Phaser.Curves.Ellipse(960, 540, 400));

        this.tweens.add({
            targets: this.follower5,
            t: 1,
            ease: 'Sine.easeInOut',
            duration: 50000,
            yoyo: true,
            repeat: -1
        });
        
        this.bg = this.physics.add.sprite(960, 540, 'bg');
        this.montagne = this.physics.add.sprite(960, 540, 'montagne');
        this.start = this.physics.add.sprite(960, 540, 'start');
        this.title = this.physics.add.sprite(960, 250, 'title');
        this.fruit = this.physics.add.sprite(960, 540, 'fruit');
        this.escargo = this.physics.add.sprite(960, 540, 'escargot').setDepth(2);
        
        //this.destructeur = this.physics.add.sprite(960, 980, 'destructeur');
        
    }
    update(){
           
        this.graphics1.clear();
        this.graphics1.lineStyle(2, 0xffffff, 1);

        this.path1.draw(this.graphics1);
        
        this.path1.getPoint(this.follower1.t, this.follower1.vec);

        this.graphics1.fillStyle(0xff0000, 1);
        this.graphics1.fillCircle(this.follower1.vec.x, this.follower1.vec.y, 12);
        
        this.title.x = ((this.follower1.vec.x + this.pointerS.x)/2);
        this.title.y = ((this.follower1.vec.y + this.pointerS.y)/2);
        
        
        
        this.graphics2.clear();
        this.graphics2.lineStyle(2, 0xffffff, 1);

        this.path2.draw(this.graphics2);
        
        this.path2.getPoint(this.follower2.t, this.follower2.vec);

        this.graphics2.fillStyle(0xff0000, 1);
        this.graphics2.fillCircle(this.follower2.vec.x, this.follower2.vec.y, 12);
        
        this.start.x = ((this.follower2.vec.x + this.pointerT.x)/2);
        this.start.y = ((this.follower2.vec.y + this.pointerT.y)/2);

        
        
        this.graphics3.clear();
        this.graphics3.lineStyle(2, 0xffffff, 1);

        this.path3.draw(this.graphics3);
        
        this.path3.getPoint(this.follower3.t, this.follower3.vec);

        this.graphics3.fillStyle(0xff0000, 1);
        this.graphics3.fillCircle(this.follower3.vec.x, this.follower3.vec.y, 12);
        
        this.escargo.x = ((this.follower3.vec.x + this.pointerE.x)/2);
        this.escargo.y = ((this.follower3.vec.y + this.pointerE.y)/2);
            
        
        
        this.particule = this.physics.add.group({
            key: 'particule_energie_2',
            setXY: { x: this.escargo.x, y: this.escargo.y}
        });
     
        this.particule.setVelocityX(Phaser.Math.Between(-500, -400));
        this.particule.setVelocityY(Phaser.Math.Between(200, 300));
        //this.physics.add.collider(this.particule, this.destructeur, this.deletParticules, null, this);
        
        
        
        this.particule = this.physics.add.group({
            key: 'particule_energie_1',
            setXY: { x: this.escargo.x, y: this.escargo.y}
        });
        
        this.particule.setVelocityX(Phaser.Math.Between(-500, -400));
        this.particule.setVelocityY(Phaser.Math.Between(200, 300));
        //this.physics.add.collider(this.particule, this.destructeur, this.deletParticules, null, this);
        
     
        
        this.graphics4.clear();
        this.graphics4.lineStyle(2, 0xffffff, 1);

        this.path4.draw(this.graphics4);
        
        this.path4.getPoint(this.follower4.t, this.follower4.vec);

        this.graphics4.fillStyle(0xff0000, 1);
        this.graphics4.fillCircle(this.follower4.vec.x, this.follower4.vec.y, 12);
        
        this.fruit.x = ((this.follower4.vec.x + this.pointerF.x)/2);
        this.fruit.y = ((this.follower4.vec.y + this.pointerF.y)/2);
        
        this.fruit.rotation += 0.005
        
        
        
        this.graphics5.clear();
        this.graphics5.lineStyle(2, 0xffffff, 1);

        this.path5.draw(this.graphics5);
        
        this.path5.getPoint(this.follower5.t, this.follower5.vec);

        this.graphics5.fillStyle(0xff0000, 1);
        this.graphics5.fillCircle(this.follower5.vec.x, this.follower5.vec.y, 12);
        
        this.bg.x = ((this.follower5.vec.x + this.pointerC.x)/2);
        this.bg.y = ((this.follower5.vec.y + this.pointerC.y)/2);
        
        
        
        if (this.cursors.space.isDown){
            this.scene.start("zoneTest");
        }
        
    }
    
    deletParticules (particule ,destructeur)
    {
        this.particule.destroy(true, true);
    }
    
    
    
    
}