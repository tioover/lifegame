var live = true;
var dead = false;

$(document).ready(function(){
    var matrix = init(50, 25);
    matrix = set(matrix);
    show(matrix);
    setInterval(function(){
        matrix = next(matrix);
        show(matrix);
    }, 500);
});

function trave(matrix, func)
{
    //abstract
    var max = xymax(matrix);
    var x = y = 0;
    while (x < max.x)
    {
        while (y < max.y)
        {
            func(x, y);
            ++ y;
        }
        ++ x;
        y = 0;
    }
}

function init(x_max, y_max)
{
    var matrix = new Array();
    var x = y = 0;
    while (x < x_max)
    {
        matrix[x] = new Array();
        while (y < y_max)
        {
            matrix[x][y] = dead;
            ++ y;
        }
        ++ x;
        y = 0;
    }
    return matrix;
}

function set(matrix)
{
    //fly
    /*matrix[40][21] = live;
    matrix[41][21] = live;
    matrix[42][21] = live;
    matrix[40][22] = live;
    matrix[41][23] = live;*/
    //long
    var base_x = 20;
    matrix[base_x][7] = live;
    matrix[base_x + 1][1] = live;
    matrix[base_x + 1][2] = live;
    matrix[base_x + 2][2] = live;
    matrix[base_x + 2][6] = live;
    matrix[base_x + 2][7] = live;
    matrix[base_x + 2][8] = live;
    return matrix;
}

function next(matrix)
{
    var max = xymax(matrix);
    var next_matrix = init(max.x, max.y);
    trave(matrix, function(x, y){
        var adja_num = adjacent_cell_num(matrix, x, y);
        if (adja_num == 2)
            next_matrix[x][y] = matrix[x][y]; //stable
        else if (adja_num == 3)
        {
            next_matrix[x][y] = live; //relive
        }
        else
        {
            next_matrix[x][y] = dead; //dead
        }
    });
    return next_matrix;
}

function adjacent_cell_num(matrix, x, y)
{
    //Number of adjacent grid
    var cell = matrix[x][y];
    var num = 0;
    var line = function (li){
        if (li != undefined)
        {
            if (li[y - 1] == live)
                ++ num;
            if (li[y] == live)
                ++ num;
            if (li[y + 1] == live)
                ++ num;
        }
    }
    line(matrix[x + 1]);
    line(matrix[x - 1]);
    if (matrix[x][y - 1] == live)
        ++ num;
    if (matrix[x][y + 1] == live)
        ++ num;
    return num;
}

function xymax(matrix)
{
    //max pos
    var x_max = matrix.length;
    var y_max = matrix[0].length;
    var max = {"x": x_max, "y": y_max};
    return max;
}

function show(matrix)
{
    //show all cell.
    var id = "main";
    var radius = 10;
    var canvas = document.getElementById(id);
    clear(canvas);
    trave(matrix, function(x, y){
        var context = cell_write(canvas, radius, x, y, matrix[x][y]);
    });
    return canvas;
}

function clear(id){
    //clear canvas.
    var id = "main";
    var canvas = document.getElementById(id);
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function cell_write(canvas, radius, x, y, cell)
{
    var dia = radius * 2;
    var context = canvas.getContext("2d");
    var centerX = dia * (x + 1);
    var centerY = dia * (y + 1);
 
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    if (cell)
        context.fillStyle = "#999";
    else
        context.fillStyle = "#CCC";
    context.fill();
    return context;
}

