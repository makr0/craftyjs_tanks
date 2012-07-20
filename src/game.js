window.onload = function() {
        
    var version = null,
    	today = new Date();
	
	// Fix for cache
    if(gameContainer.env == 'dev') {
		version = today.getDay()+"_"+ today.getHours() +"_"+today.getSeconds();
	} else {
		version = gameContainer.gameVersion;
	};
    
	//start Crafty
	Crafty.init(800, 800);
	Crafty.canvas.init();
	// wire dom-events into Crafty events
	Crafty.addEvent(this, "mousemove", function(e) {
	    var pos = Crafty.DOM.translate(e.clientX, e.clientY);
	    Crafty.trigger('lookat',pos);

	});
	Crafty.addEvent(this,"mousedown", function(e) {
	    var pos = Crafty.DOM.translate(e.clientX, e.clientY);
	    Crafty.trigger('shoot',pos);
	});

	require([
	         "src/sprites.js?v="+version+"",
	         "src/config.js?v="+version+"",
	], function() {
		// Create Sprites
		var sprites = new Sprites();
		sprites.create();

		// Load config
		gameContainer['conf'] = new Config({});
		
		//the loading screen - that will be display while assets loaded
		Crafty.scene("loading", function() {
            // clear scene and interface
            sc = new Backbone.Collection();

			var loadingText = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
					.attr({w: 500, h: 20, x: ((Crafty.viewport.width) / 2), y: (Crafty.viewport.height / 2), z: 2})
					.text('Loading...')
					.textColor('#000')
					.textFont({'size' : '24px', 'family': 'Arial'});
		
			// load takes an array of assets and a callback when complete
			Crafty.load(sprites.getPaths(), function() {
				// array with local components
                var elements = [
                    "src/entities/base/BaseEntity.js?v="+version+"",
                    "src/components/Backbone.js?v="+version+""
			        
	    		];

    			//when everything is loaded, run the main scene
    			require(elements, function() {	   
    				var elements = [
				        "src/components/Explodable.js?v="+version+"",
				        "src/components/Healthbar.js?v="+version+"",
				        "src/entities/bullet.js?v="+version+"",
				        "src/entities/wall.js?v="+version+"",
				        "src/entities/world_bounds.js?v="+version+"",
				        "src/entities/tank_controls.js?v="+version+"",
				        "src/entities/tank.js?v="+version+"",
				        "src/entities/enemy.js?v="+version+""
		    		];
    				require(elements, function() {
    					loadingText.destroy();
	    				if (gameContainer.scene != undefined) {
	    					Crafty.scene(gameContainer.scene);
	    				}
    				});
    			});
    		},
			function(e) {
				loadingText.text('Loading ('+(e.percent.toFixed(0))+'%)');
			});
		});
		
		// declare all scenes
		var scenes = [
			"src/scenes/main.js?v="+version+"",
		];
		
		require(scenes, function(){});
		
		//automatically play the loading scene
		Crafty.scene("loading");
	});
};