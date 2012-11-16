var LIVE = true;
var DEAD = false;
var X = 0;
var Y = 1;

var lifegame = (function($){
  var cells = [];
  var core = {
    next: function(){},

    around: function(point, step){},

    killer: function(cell) {},

    reviver: function(cell) {},

    is_same_point: function(a, b){},

    make_point: function(x, y){
      var point = {"x": x, "y": y};

      point.relative_position = function(point){
        return {x: point.x - this.x, y: point.y - this.y};
      };

      point.distance = function(point){
        var position = this.relative_position(point);
        return {x: Math.abs(position.x), y:Math.abs(position.y)};
      };

      point.equal = function(point){
        if(this.x == point.x && this.y == point.y)
          return true;
        else
          return false;
      }

      point.bigger = function(point){
        if(this.x > point.x || (this.x == point.x && this.y > point.y))
          return true;
        else
          return false;
      };
      return point;
    },

    get_blank: function(matrix){},

    get_cells: function(matrix){},

    set_cell: function(point){
      if(cells.length == 0){
        cells.push(point);
      }
      else if(cells.length == 1){
        if(point.bigger(cells[0])){
          cells.push(point);}
        else
          cells.unshift(point);
      }
      else{
        for(var i in cells){
          if(point.bigger(cells[cells.length-1]))
            cells.push(point);
          if(cells[i].bigger(point)){
            cells.splice(i, 0, point);
            break;}
        }
      }
    }
  };

  var test = {
    around: function(){},
    next: function(){},
    killer: function(){},
    reviver: function(){},
    is_same_point: function(){},

    set_cells: function(){
      var add = function(x, y){
        var p = core.make_point(x,y);
        core.set_cell(p);
      };
      add(20,1);
      add(10,1);
      add(0,11);
      add(10,29);
      add(10,100);
      add(20,100);
      console.log(cells);
    }
  };

  return {
    core: core,
    cells: cells,
    test: test};
})(jQuery);
