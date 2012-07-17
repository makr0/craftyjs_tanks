Crafty.c('Backbone', {
    remove: function() {
        var craftyEntity = this;
        var backboneEntity = sc.find(function(item){
            entity = item.getEntity();
            return entity == craftyEntity;
        });
        if(backboneEntity) {
            sc.remove(backboneEntity);
            backboneEntity.remove();
        }
    }
});