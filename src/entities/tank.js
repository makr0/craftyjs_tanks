Crafty.c("Tank",{
    init: function(){
        this.requires("2D,"+gameContainer.conf.get('renderType')+",Collision,Explodable,Healthbar,TankControls,Backbone,tank_body");
        var sprites = new Sprites(),
            turret_offset = sprites.get('images')['tank']['offsets']['tank_turret'],
            hitbox_points = sprites.get('images')['tank']['hitboxes']['tank_body'],

            hitbox = new Crafty.polygon(Crafty.clone(hitbox_points));
        this.origin("center")
        .attr({visible:false})
        .collision(hitbox)
        .Healthbar()
        .onHit('Bullet',function(items){
            for( index in items ){
                if(items[index].obj.firedFrom != this ) {
                    this.attr('health',this.attr('health')-items[index].obj.power);
                    if( this.health <= 0 ){
                        this.turret.destroy();
                        this.explode();
                    }
                    items[index].obj.explode();
                }
            }
        });

        this.turret = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", tank_turret");
        
        this.turret.origin(turret_offset.x,turret_offset.y)
                   .attr({lookat:{x:100,x:100},tank:this})
                   .bind('shoot',function(){
                       this.tank.shoot(this.lookat);
                   })
                   .bind('lookat',function(pos){
                       this.lookat=pos;
                   })
                   .bind("EnterFrame", function(e) {
                       this.rotation = ~~(Math.atan2(this.lookat.y - this._y-turret_offset.y, this.lookat.x - this._x - turret_offset.x) * (180 / Math.PI)) ;
                       this.rotation+=180;
                       this.x=this.tank._x-10;
                       this.y=this.tank._y;
                   });
    },
    shoot: function(pos) {
        Crafty.e("Bullet").setName('bullet')
        .attr({x:this._x+turret_offset.x-17,y:this._y+turret_offset.y-5,startpos:{x:42,y:42},  lookat:pos,
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
