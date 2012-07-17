Crafty.scene("main", function() {

	var elements = [
	];
	
	//when everything is loaded, run the main scene
	require(elements, function() {
		sc.add( new WorldBounds());
		sc.add( new Tank({x: 400, y: 100,rotation: 90,vr:4,speed:5,controller: 'right'}) );
		sc.add( new Tank({x: 100, y: 100,rotation: 90,controller: 'left',visible:true}) );
		for(var i=1;i<Crafty.viewport.width;i+=200) {
			sc.add( new Enemy({x: i, y: 700,rotation: -90,range:200,power:10,shootspeed:1000}) );
		}
		for(var i=100;i<Crafty.viewport.width-200;i+=200) {
			sc.add( new Enemy({x: i, y: 600,rotation: -90,range:400,power:1,shootspeed:200}) );
		}
	});

});
