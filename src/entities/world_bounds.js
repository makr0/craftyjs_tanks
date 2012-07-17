Crafty.c("WorldBounds",{
    init: function(){
        this.requires("2D,Wall");
    },
    WorldBounds: function(t) {
        var h = Crafty.viewport.height,
            w = Crafty.viewport.width;
        Crafty.e("Wall").attr({x:0,y:0,w:t,h:h}).collision([0,0],[0,h],[t,h],[t,0]);
        Crafty.e("Wall").attr({x:0,y:0,w:w,h:h-t}).collision([t,0],[w-t,0],[w-t,t],[t,t]);
        Crafty.e("Wall").attr({x:0,y:0,w:w,h:h}).collision([w,0],[w,h],[w-t,h],[w-t,0]);
        Crafty.e("Wall").attr({x:0,y:0,w:w-t,h:h}).collision([t,h],[t,h-t],[w-t,h-t],[w-t,h]);
    }
});

WorldBounds = BaseEntity.extend({
    defaults: {
        't' : 4
    },
    initialize: function(attributes){
        var model = this;
        var entity = Crafty.e("WorldBounds");
        entity.WorldBounds(model.get('t'));

        model.set({'entity' : entity });
    }
});
