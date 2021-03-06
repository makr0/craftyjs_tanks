Crafty.c("Bullet",{
    init: function(){
        this.requires("2D,"+gameContainer.conf.get('renderType')+", Collision,tank_bullet,Explodable")
            .collision([0,0],[4,0],[4,4],[0,4])
            .onHit('Tank',function(item){
                if(item[0].obj != this.firedFrom )
                    this.explode();
            })
            .onHit('Enemy',function(item){
                if(item[0].obj != this.firedFrom )
                    this.explode();
            })
            .onHit('Wall',function(item){
                this.explode();
            })
            .bind('EnterFrame',function(){
                this.x += this.vx;
                this.y += this.vy;
                this.travelled = Crafty.math.distance(this.startpos.x,this.startpos.y,this.x,this.y);
                if( this.travelled > this.range ) this.destroy();
        });
    },
    bullet: function(){
        this.rotation = ~~(Math.atan2(this.lookat.y - this._y - this._h/2, this.lookat.x - this._x -this._w/2) * (180 / Math.PI)) ;
        this.rotation+=90;
        var angle = (this._rotation)* (Math.PI / 180);
        this.vx = Math.sin(angle);
        this.vy = -Math.cos(angle);
        // start bullet at tip of cannon
        this.x += this.vx*this.startpos.x;
        this.y += this.vy*this.startpos.y;
        this.vx*=this.speed;
        this.vy*=this.speed;
        this.startpos={x:this.x,y:this.y};
        this.travelled = 0;
        return this;
    }
});
