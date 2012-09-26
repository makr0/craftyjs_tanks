Crafty.c("Healthbar",{
	init: function(){
        this.bind('Change',this.updateBar);
    },
    Healthbar: function( ) {
    	this._baseHealth=-999;
    	this._bar_bg = Crafty.e('2D,Canvas,Color')
    	this._bar_bg.attr({ x: this._x, y: this._y-this._h/2-5, z: 30, w:this._w, h:5,visible:false }).color("#f00");
    	this._bar = Crafty.e('2D,Canvas,Color');
    	this._bar.attr({ x: this._x, y: this._y-this._h/2-5, z: 35, w:this._w, h:5,visible:false }).color("#0f0");
		this.attach(this._bar_bg);
		this.attach(this._bar);
		return this;
				
    },
    updateBar: function(data) {
    	if(typeof(data) != 'undefined') {
	    	if('health' in data ) {
		    	if(this._baseHealth==-999){
		    		this._baseHealth=data['health'];
		    	}
		    	if( this._baseHealth > 0 ) {
		    		this._bar.attr({w: this._w*(data['health']/this._baseHealth) } );
		    		if( this._hideBarTimer ) clearTimeout(this._hideBarTimer);
		    		this._hideBarTimer = setTimeout($.proxy(this.hideBar,this),1000);
		    		this.showBar();
		    	}
	    	}
    	}
    },
    hideBar: function() {
    	this._bar.attr('visible',false);
    	this._bar_bg.attr('visible',false);
    },
    showBar: function() {
    	this._bar.attr('visible',true);
    	this._bar_bg.attr('visible',true);
    }

});