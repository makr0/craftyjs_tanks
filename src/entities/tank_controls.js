Crafty.c("TankControls",{
    init: function(){ this.requires('Keyboard')},
    _getAngle: function() {
        var angle = (this._rotation +90)* (Math.PI / 180);
        this.move_vect = {x:Math.sin(angle), y: -Math.cos(angle)};
    },
    _checkCollision: function() {
        if(!this.moving) return;
        var collision = this.hit("Tank")||this.hit("Wall")||this.hit("Enemy"),other;
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
            this.vx=0;
            this.vy=0;
            if(this.isDown(Crafty.keys.A) ) {
                this.moving=true;
                this.rotation -=this.vr;
            } else if(this.isDown(Crafty.keys.D) ) {
                this.moving=true;
                this.rotation +=this.vr;
            }
            this._getAngle();
            if(this.isDown(Crafty.keys.W) ) {
                this.moving=true;
                this.vx = this.move_vect.x * speed;
                this.vy = this.move_vect.y * speed;
                this.shift(this.vx, this.vy);
            } else if(this.isDown(Crafty.keys.S) ) {
                this.moving=true;
                this.vx = -this.move_vect.x * speed;
                this.vy = -this.move_vect.y * speed;
                this.shift(this.vx, this.vy);
            }
            this._checkCollision();
        });
        return this;
    },
    rightControls: function(speed) {
        this.bind("EnterFrame",function(){
            this.moving=false;
            this.vx=0;
            this.vy=0;
            if(this.isDown(Crafty.keys.LEFT_ARROW)) {
                this.moving=true;
                this.rotation -=this.vr;
            } else if(this.isDown(Crafty.keys.RIGHT_ARROW)) {
                this.moving=true;
                this.rotation +=this.vr;
            }
            this._getAngle();
            if(this.isDown(Crafty.keys.UP_ARROW)) {
                this.moving=true;
                this.vx = this.move_vect.x * speed;
                this.vy = this.move_vect.y * speed;
                this.shift(this.vx, this.vy);
            } else if(this.isDown(Crafty.keys.DOWN_ARROW)) {
                this.moving=true;
                this.vx = -this.move_vect.x * speed;
                this.vy = -this.move_vect.y * speed;
                this.shift(this.vx, this.vy);
            }
            this._checkCollision();
        });
        return this;
    }
});   