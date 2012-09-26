Crafty.scene("main", function() {


	//when everything is loaded, run the main scene
	function populateLevel(monsters) {
		var w = Crafty.viewport.width,
		    h = Crafty.viewport.height,
		    controller;
		_.each(monsters,function(data){
			switch(data.name) {
				case 'L': makePlayer(data,'left');break;
				case 'R': makePlayer(data,'right');break;
				default: makeEnemy(data);
			}
		});
	}

	function makePlayer(data, controller ) {
		sc.add( new Tank({x: data.x, y: data.y,rotation: 90,vr:2,speed:4,controller: controller,health:100}) );
	}

	function makeEnemy(data) {
		if( data.name == '-')
			sc.add( new Enemy({x: data.x, y: data.y,rotation: 180,range:200,power:10,shootspeed:1000,health:100}) );
		if( data.name == 'I')
			sc.add( new Enemy({x: data.y, y: data.y,rotation: -90,range:400,power:1,shootspeed:200,health:20}) );
	}

	loadMap('level1.txt',populateLevel);

});
