Crafty.scene("main", function() {

	var elements = [
	];
	
	//when everything is loaded, run the main scene
	require(elements, function() {
		var w = Crafty.viewport.width,
		    h = Crafty.viewport.height;
		sc.add( new WorldBounds());
		sc.add( new Tank({x: 400, y: 100,rotation: 90,vr:2,speed:4,controller: 'right',health:100}) );
		sc.add( new Tank({x: 100, y: 100,rotation: 90,vr:2,speed:4,controller: 'left',health:100}) );
		for(var i=1;i<w;i+=200) {
			sc.add( new Enemy({x: i, y: 700,rotation: -90,range:200,power:10,shootspeed:1000,health:100}) );
		}
		for(var i=100;i<w-200;i+=200) {
			sc.add( new Enemy({x: i, y: 600,rotation: -90,range:400,power:1,shootspeed:200,health:20}) );
		}
		sc.add( new Enemy({x: w/2-100, y: h/2-100,rotation: -90,range:400,power:1,shootspeed:200,health:100}) );

	});

});
