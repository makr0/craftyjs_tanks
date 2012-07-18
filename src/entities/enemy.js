Crafty.c("Enemy",{
    init: function(){
        this.requires("2D,Canvas,Collision,enemy_body,Backbone");
        var hitbox = new Crafty.polygon([[0,0],[100,0],[100,66],[0,66]]);
        this.origin("center")
        .attr({visible:false})
        .collision(hitbox)
        .onHit('Bullet',function(items){
            for( index in items ){
                this.health-=items[index].obj.power;
                if( this.health <= 0 ){
                    this.remove();
                    this.turret.destroy();
                    if(this.shoottimer) clearTimeout(this.shoottimer);
                }
                items[index].obj.destroy();
            }
        });
        turret_offset={x:49,y:18};

        this.turret = Crafty.e("2D, Canvas, enemy_turret")
            .origin(turret_offset.x,turret_offset.y)
            .attr({x: this._x, y: this._y,lookat:this.lookat,body:this})
            .bind("EnterFrame", function(e) {
                var tanks = sc.where({type:'tank'}),
                    mypos={x:this._x+this._origin.x,y:this._y+this._origin.y},
                    me=this,
                    range = this.body.range;
                // search nearest tank
                this.hasTarget=false;
                _.each(tanks, function(ent) {
                    var tank = ent.getEntity(),
                        tankpos={x:tank._x+tank._origin.x,y:tank._y+tank._origin.y},
                        distance=Crafty.math.distance(tankpos.x,tankpos.y,mypos.x,mypos.y);
                    if(distance < range && tank._visible && (me.x && me.y) ) {
                        range = distance;
                        me.lookat = tankpos;
                        me.hasTarget = true;
                    }
            	});
                if( this.lookat ) {
                    this.rotation = ~~(Math.atan2(this.lookat.y - this._y-turret_offset.y, this.lookat.x - this._x - turret_offset.x) * (180 / Math.PI)) ;
                    this.rotation+=180;
                } else this.rotation=90;
                this.x = this.body._x;
                this.y = this.body._y;
                if( this.hasTarget && !this.shoottimer ) {
                    this.shoottimer = setTimeout($.proxy(this.body.shoot,this),me.body.shootspeed);
                }
                if( !this.hasTarget ) {
                    this.shoottimer=false;
                }
            });
    },
    shoot: function() {
        this.shoottimer=false;
        Crafty.e("Bullet").setName('bullet')
        .attr({x:this._x+turret_offset.x,y:this._y+turret_offset.y,startpos:{x:50,y:50}, lookat:this.lookat,
            speed:5,
            power:this.body.power,
            range:this.body.range,
            firedFrom:this.body})
        .bullet();
    }
});

Enemy = BaseEntity.extend({
	defaults: {
        'speed' : 0,
        'lookat': {x:Crafty.viewport.width/2,y:Crafty.viewport.height/2},
        'shootspeed': 1000,
        'visible' : true,
        'health' : 10,
        'range'  : 300
    },
    initialize: function(){
    	var model = this;
    	var entity = Crafty.e("Enemy");
        entity
            .attr(model.attributes)

            .setName('Enemy '+this.O);

    	model.set({'entity' : entity });
    }
});
