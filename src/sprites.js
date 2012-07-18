/**
    examples:             
    'sprites_name' : {
         'file' : 'path/to/file',
         'tile' : width,
         'tileh' : height,
         'elements': {
             'sprite_name' : [0, 0]
         }
    },
*/

Sprites = Backbone.Model.extend({
    defaults: {
        images:{
            'tank_old' : {
                 'file' : 'web/images/tank.png',
                 'tile' : 1,
                 'offsets': {
                    tank_turret: {x:49,y:18}
                 },
                 'hitboxes': {
                    tank_body: [[0,0],[100,0],[100,66],[0,66]]
                 },
                 'elements': {
                     tank_body_old: [0,2,100,66],
                     tank_turret_old: [15,71,69,37],
                     tank_bullet_old: [142,9,4,4]
                 }
            },
            'tank' : {
                 'file' : 'web/images/largetank.png',
                 'tile' : 1,
                 'offsets': {
                    tank_turret: {x:41,y:13}
                 },
                 'hitboxes': {
                    tank_body: [[0,0],[57,0],[57,30],[0,30]]
                 },
                 'elements': {
                     tank_body: [0,2,58,32],
                     tank_turret: [3,34,57,28],
                     tank_bullet: [1,66,4,4]
                 }
            },
            'enemy' : {
                 'file' : 'web/images/enemy.png',
                 'tile' : 1,
                 'elements': {
                     enemy_body: [0,2,100,66],
                     enemy_turret: [15,71,69,37],
                     enemy_bullet: [142,9,4,4]
                 }
            }
        }
    },
    initialize: function(){
        
    },
    /**
     * Create Crafty sprites from images object
     * Pass key if You want create only one choosen sprite.
     * 
     * @param  string key - sprite definition key
     */
    create: function(key){
        if(key != undefined){
            element = this.get('images')[key];
            if(element['tileh'] == undefined)
                Crafty.sprite(element['tile'], element['file'], element['elements']);
            else
                Crafty.sprite(element['tile'], element['tileh'], element['file'], element['elements']);
    		
            return true;
        };

        _.each(this.get('images'), function(element, k){ 
            if(element['tileh'] == undefined)
                Crafty.sprite(element['tile'], element['file'], element['elements']);
            else
                Crafty.sprite(element['tile'], element['tileh'], element['file'], element['elements']);
        });

    },
    /**
     * Get path for sprites files - for loading
     * 
     * @return array array of files paths
     */
    getPaths: function(){
        var array = [], i=0;
        _.each(this.get('images'), function(element, key){ 
            array[i] = element['file']
            i++;
        });

        return array;
    }
});