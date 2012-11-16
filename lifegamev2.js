var LIVE = true;
var DEAD = false;
var X = 0;
var Y = 1;

function set_cell(cells, x, y) {
  cells.push([x, y])
}

function distance(a, b) {
  return Math.abs(a - b);
}

function next_step(cells) {
  var STABLE = 2;
  var RELIVE = 3;
  var around_cells = [];
  var beside_cells = [];
  var willdead_index = [];
  var willrelive_cells = [];
  var next_cells = [];
  for (datum in cells) {
    around_cells = around(cells[datum], cells, 2);
    beside_cells = around(cells[datum], around_cells, 1);
    if (beside_cells.length != STABLE && beside_cells.length != RELIVE)
      willdead_index.push(datum);
    willrelive_cells.push(relive_cell(cells[datum], around_cells));
  }
  next_cells = cells_merge(cells, willdead_index, willrelive_cells);
  return next_cells;
}

function relive_cell(cell, around_cells) {
  var willrelive = [];
  var around_blanks = make_around_points(cell, around_cells, 1); 
  for (var i in around_blanks) {
    var blanks_around_cells = around(around_blanks[i], around_cells, 1);
    if (blanks_around_cells.length == 3) {
      console.log(around_blanks[i], blanks_around_cells);
      willrelive.push(around_blanks[i]);
    }
  }
  return willrelive;
}

function cells_merge(cells, willdead, willrelive){
  willdead.sort().reverse()
  for (var i in willdead){
    cells.splice(willdead[i], 1);
  }
  cells = cells.concat(willrelive);
  return cells;
}

function around(point, cells, step) {
  var around_cells = [];
  for (var i in cells) {
    if (distance(point[X], cells[i][X])<=step && distance(point[Y], cells[i][Y])<=step)
      around_cells.push(cells[i]);
  }
  return around_cells;
}

function make_around_points(point, exclusions, step) {
  var around_points = [];
  var left_top = [point[X] - step, point[Y] - step];
  var right_down = [point[X] + step, point[Y] + step];
  var x = left_top[X];
  var y = left_top[Y];
  exclusions.push(point);
  while (x <= right_down[X]) {
    y = left_top[Y];
    while (y <= right_down[Y]) {
      // exclude point that in "exclusions".
      var add = true;
      if (exclusions.length != 0){
        for (var i in exclusions) {
          if (x == exclusions[i][X] && y == exclusions[i][Y]) {
            add = false;
            break;
          }
        }
      }
      if (add == true) // if the point not in "exclusions". 
        around_points.push([x, y]);
      y++;
    }
    x++;
  }
  return around_points;
}


function set_all(matrix)
{/*
  set_cell(matrix, 10, 17);
  set_cell(matrix, 11, 11);
  set_cell(matrix, 11, 12);
  set_cell(matrix, 12, 12);
  set_cell(matrix, 12, 16);
  set_cell(matrix, 12, 17);
  set_cell(matrix, 12, 18);
  */
  set_cell(matrix, 10, 21);
  set_cell(matrix, 10, 20);
  return matrix;
}

function show(matrix)
{
  var canvas = document.getElementById("matrix");
  canvas.width = parseInt(window.screen.availWidth);
  canvas.height = parseInt(window.screen.availHeight);
  var context = clear(canvas)
  var radius = 10;
  for (var i in matrix){
    var context = cell_painter(canvas, radius, matrix[i]);
  }
}

//clear canvas.
function clear(canvas){
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  return context;
}

function cell_painter(canvas, radius, cell)
{
  if (cell)
  {
    var dia = radius * 2;
    var context = canvas.getContext("2d");
    var centerX = dia * (cell[X]);
    var centerY = dia * (cell[Y]);
 
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = "#9bff9b";
    context.fill();
  }
  return context;
}

$(document).ready(function()
{/*
  var matrix = [];
  matrix = set_all(matrix);
  show(matrix);
  step_time = 3000;
  setInterval(function(){
    matrix = next_step(matrix);
    show(matrix);
  }, step_time);*/
});

