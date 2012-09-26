

function loadMap(file, callback) {
  file = gameContainer.conf.get('leveldata')+'/'+file;
  $.get(file,function(data) {
    var monsters = [];
    var rows = data.split("\n");
    var cellcount = data.length;

    $.each(rows,function(_y,row) {
      var columns = row.split('');
      $.each(columns,function(_x,column) {
        var x = _x*32;
        var y = _y*32;
        switch( column ) {
          case 'W':Crafty.e("2D, Canvas, wall, Wall").attr({x:x, y:y});break;
          case ' ':break;
          default: monsters.push({x:x,y:y,name:column});
        }
      });

    });
    callback(monsters);
  });
}
