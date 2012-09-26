Crafty.c("Explodable",{
    explode: function(){
        this.destroy();
        Crafty.e("2D, DOM, SpriteAnimation,explosion")
            .attr({x:this._x+this._origin.x-19,y:this._y+this._origin.y-32})
            .animate('explosion',0,0,18)
            .animate('explosion',15,0)
            .bind('EnterFrame',function(){
                if( !this.isPlaying('explosion'))
                    this.destroy();
            });
    }
});