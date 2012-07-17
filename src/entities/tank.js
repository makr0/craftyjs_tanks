Crafty.c("Tank",{
    init: function(){
        this.requires("2D,Canvas,Collision,tank_body,TankControls,Backbone");
        var hitbox = new Crafty.polygon([[0,0],[100,0],[100,66],[0,66]]);
        this.origin("center")
        .attr({visible:false})
        .collision(hitbox)
        .onHit('Bullet',function(items){
            for( index in items ){
                if(items[index].obj.firedFrom != this ) {
                    this.health-=items[index].obj.power;
                    console.log(this.health);
                    if( this.health <= 0 ){
                        this.remove();
                        this.turret.destroy();
                    }
                    items[index].obj.destroy();
                    
                }
            }
        });

        turret_offset={x:49,y:18};

        this.turret = Crafty.e("2D, Canvas, tank_turret")
            .origin(turret_offset.x,turret_offset.y)
            .attr({x: this._x, y: this._y,lookat:{x:100,x:100},tank:this})
            .bind('shoot',function(){
                this.tank.shoot(this.lookat);
            })
            .bind('lookat',function(pos){
                this.lookat=pos;
            })
            .bind("EnterFrame", function(e) {
                this.rotation = ~~(Math.atan2(this.lookat.y - this._y-turret_offset.y, this.lookat.x - this._x - turret_offset.x) * (180 / Math.PI)) ;
                this.rotation+=180;
                this.x = this.tank._x;
                this.y = this.tank._y; 
               
            });
    },
    shoot: function(pos) {
        Crafty.e("Bullet").setName('bullet')
        .attr({x:this._x+turret_offset.x,y:this._y+turret_offset.y, lookat:pos,
            speed:5,
            power:10,
            range:400,
            firedFrom:this})
        .bullet();
    }
});

Tank = BaseEntity.extend({
	defaults: {
        'speed' : 2,
        'vr': 2,
        'type': 'tank',
        'visible':true,
        'health':10
    },
    initialize: function(){
    	var model = this;
    	var entity = Crafty.e("Tank");
        entity
            .attr(model.attributes)
            .setName(model.get('controller')+' Tank');
        if( model.get('controller') == 'right'){
            entity.rightControls(model.get('speed'));
        } else {
            entity.leftControls(model.get('speed'))
        }

    	model.set({'entity' : entity });
    }
});
