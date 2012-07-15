
window.onload = function() {
    Crafty.load(["assets/tank.png"], function() {
        initSprites();
        initGame();
        startGame();
    });

    function startGame(){
        Crafty.e("WorldBounds");
        Crafty.e("Tank").attr({x: 100, y: 100})
            .leftControls(3)
            .Tank();
        Crafty.e("Tank").attr({x: 400, y: 400})
            .rightControls(2)
            .Tank();
    };
    function initGame() {
        Crafty.init(800, 800);
        Crafty.canvas.init();
        Crafty.c("TankControls",{
            init: function(){ this.requires('Keyboard')},
            _getAngle: function() {
                var angle = (this._rotation +90)* (Math.PI / 180);
                this._vx = Math.sin(angle),
                this._vy = -Math.cos(angle);
            },
            _checkCollision: function() {
                if(!this.moving) return;
                var collision = this.hit("Tank")||this.hit("Wall"),other;
                if(collision) {
                    for( index in collision ){
                        other = collision[index];
                        this.x += Math.ceil(other.normal.x * -other.overlap);
                        this.y += Math.ceil(other.normal.y * -other.overlap);
                    }
                }
            },
            leftControls: function(speed) {
                this.bind("EnterFrame",function(){
                    this.moving=false;
                    if(this.isDown(Crafty.keys.A) ) {
                        this.moving=true;
                        this.rotation -=1;
                    } else if(this.isDown(Crafty.keys.D) ) {
                        this.moving=true;
                        this.rotation +=1;
                    }
                    this._getAngle();
                    if(this.isDown(Crafty.keys.W) ) {
                        this.moving=true;
                        this.x += this._vx * speed;
                        this.y += this._vy * speed;
                    } else if(this.isDown(Crafty.keys.S) ) {
                        this.moving=true;
                        this.x -= this._vx * speed;
                        this.y -= this._vy * speed;
                    }
                    this._checkCollision();
                });
                return this;
            },
            rightControls: function(speed) {
                this.bind("EnterFrame",function(){
                    this.moving=false;
                    if(this.isDown(Crafty.keys.LEFT_ARROW)) {
                        this.moving=true;
                        this.rotation -=1;
                    } else if(this.isDown(Crafty.keys.RIGHT_ARROW)) {
                        this.moving=true;
                        this.rotation +=1;
                    }
                    this._getAngle();
                    if(this.isDown(Crafty.keys.UP_ARROW)) {
                        this.moving=true;
                        this.x += this._vx * speed;
                        this.y += this._vy * speed;
                    } else if(this.isDown(Crafty.keys.DOWN_ARROW)) {
                        this.moving=true;
                        this.x -= this._vx * speed;
                        this.y -= this._vy * speed;
                    }
                    this._checkCollision();
                });
                return this;
            }
        });   
        Crafty.c("Tank",{
            init: function(){
                this.requires("2D,Canvas,Collision,tank_body,TankControls");
            },
            Tank: function() {
                this.origin("center")
                .attr({lookat:{x:100,x:100}})
                .collision([0,0],[100,0],[100,66],[0,66]);
                turret_offset={x:49,y:18};

                this.bind()
                var me = this;
                turret = Crafty.e("2D, Canvas, tank_turret")
                    .origin(turret_offset.x,turret_offset.y)
                    .attr({x: this._x, y: this._y,lookat:{x:100,x:100}})
                    .bind('shoot',function(){
                        Crafty.e("bullet")
                        .attr({x:this._x+turret_offset.x,y:this._y+turret_offset.y,lookat:this.lookat,
                            speed:8,
                            firedFrom:me})
                        .bullet();
                    })
                    .bind('lookat',function(pos){
                        this.lookat=pos;
                    })
                    .bind("EnterFrame", function(e) {
                        this.rotation = ~~(Math.atan2(this.lookat.y - this._y-turret_offset.y, this.lookat.x - this._x - turret_offset.x) * (180 / Math.PI)) ;
                        this.rotation+=180;
                        this.x = me._x;
                        this.y = me._y; 
                       
                    });
                return this;
            }
        });
        
        Crafty.addEvent(this, "mousemove", function(e) {
            var pos = Crafty.DOM.translate(e.clientX, e.clientY);
            Crafty.trigger('lookat',pos);
        });
        Crafty.addEvent(this,"mousedown", function(e) {
            var pos = Crafty.DOM.translate(e.clientX, e.clientY);
            Crafty.trigger('shoot',pos);
        });
        Crafty.c("Wall",{
            init: function(){
                console.log("Wall created");
                this.requires("2D,Collision,Canvas");
            }
        });
        Crafty.c("WorldBounds",{
            init: function(){
                console.log("WorldBounds created");

                this.requires("2D,Wall");
                var h = Crafty.viewport.height,
                    w = Crafty.viewport.width,
                    t = 3;
                Crafty.e("Wall").attr({x:0,y:0,w:t,h:h}).collision([0,0],[0,h],[t,h],[t,0]);
                Crafty.e("Wall").attr({x:0,y:0,w:w,h:h-t}).collision([t,0],[w-t,0],[w-t,t],[t,t]);
                Crafty.e("Wall").attr({x:0,y:0,w:w,h:h}).collision([w,0],[w,h],[w-t,h],[w-t,0]);
                Crafty.e("Wall").attr({x:0,y:0,w:w-t,h:h}).collision([t,h],[t,h-t],[w-t,h-t],[w-t,h]);
            }
        });
        Crafty.c("bullet",{
            init: function(){
                this.requires("2D,Canvas,Collision,tank_bullet")
                    .collision([0,0],[4,0],[4,4],[0,4])
                    .onHit('Tank',function(item){
                        if(item[0].obj != this.firedFrom )
                            this.destroy();
                    })
                    .onHit('Wall',function(item){
                        this.destroy();
                    })
                    .bind('EnterFrame',function(){
                        this.x += this.vx;
                        this.y += this.vy;
                });
            },
            bullet: function(){
                this.rotation = ~~(Math.atan2(this.lookat.y - this._y - this._h/2, this.lookat.x - this._x -this._w/2) * (180 / Math.PI)) ;
                this.rotation+=90;
                var angle = (this._rotation)* (Math.PI / 180);
                this.vx = Math.sin(angle);
                this.vy = -Math.cos(angle);
                // start bullet at tip of cannon
                this.x += this.vx*50;
                this.y += this.vy*50;
                this.vx*=this.speed;
                this.vy*=this.speed;
                return this;
            }
        });
     
    }
    function initSprites() {
        SPRITES = {
            tank_body: [0,2,100,66],
            tank_turret: [15,71,69,37],
            tank_bullet: [142,9,4,4]
        };
        
        Crafty.sprite(1, "assets/tank.png", SPRITES);
    }

};
