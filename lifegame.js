var live = true;
var dead = false;

$(document).ready(function(){
    var matrix = init(100, 50);
    matrix = set(matrix);
    show(matrix);
    setInterval(function(){
        matrix = next(matrix);
        show(matrix);
    }, 500);
});

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
    matrix[20][1] = live;
    matrix[21][1] = live;
    matrix[22][1] = live;
    return matrix;
}

function next(matrix)
{
    var max = mmax(matrix);
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

function mmax(matrix)
{
    var x_max = matrix.length;
    var y_max = matrix[0].length;
    var max = {"x": x_max, "y": y_max};
    return max;
}

function show(matrix)
{
    var id = "main";
    var radius = 10;
    var canvas = document.getElementById(id);
    clear(canvas);
    trave(matrix, function(x, y){
        cell_write(canvas, radius, x, y, matrix[x][y]);
    });
}

function clear(id){
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

}

function trave(matrix, func)
{
    var max = mmax(matrix);
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
