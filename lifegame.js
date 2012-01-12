var LIVE= true;
var DEAD= false;
var XMAX = 1000;
var YMAX = 1000;

$(document).ready(function()
{
    var matrix = init();
    matrix = set_all(matrix);
    show(matrix);
    step_time = 100;
    setInterval(function(){
        matrix = nextstep(matrix);
        show(matrix);
    }, step_time);
});

function through(yfunc)
{
    //Through two-dimensional array.
    var x = y = 0;
    while (x < XMAX)
    {
        while(y < YMAX)
        {
            yfunc(x, y);
            ++ y;
        }
        ++ x;
        y = 0;
    }
}

function init()
{
    var matrix = new Array();
    through(function(x, y){
        if (matrix[x] == undefined)
            matrix[x] = new Array();
        matrix[x][y] = DEAD;
    });
    return matrix;
}

function set_all(matrix)
{
    set(matrix, 0, 7);
    set(matrix, 1, 1);
    set(matrix, 1, 2);
    set(matrix, 2, 2);
    set(matrix, 2, 6);
    set(matrix, 2, 7);
    set(matrix, 2, 8);
    return matrix;
}

function set(matrix, x, y)
{
    xoffset = 40;
    yoffset = 20;
    matrix[x+xoffset][y+yoffset] = LIVE;
}


function show(matrix)
{
    var canvas = document.getElementById("matrix");
    canvas.width = parseInt(window.screen.availWidth);
    canvas.height = parseInt(window.screen.availHeight);
    var context = clear(canvas)
    var radius = 10;
    through(function(x, y){
        var context = cell_painter(canvas, radius, x, y, matrix[x][y]);
    });
}

//clear canvas.
function clear(canvas){
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    return context;
}

function cell_painter(canvas, radius, x, y, cell)
{
    if (cell)
    {
        var dia = radius * 2;
        var context = canvas.getContext("2d");
        var centerX = dia * (x);
        var centerY = dia * (y);
     
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = "#9bff9b";
        context.fill();
    }
    return context;
}

function nextstep(matrix)
{
    var next_matrix = init();
    var STABLE_NUM = 2;
    var RELIVE_NUM = 3;
    through(function(x, y){
        var adja_num = adjacent_cell_num(matrix, x, y);
        if (adja_num == STABLE_NUM)
            next_matrix[x][y] = matrix[x][y]; //stable
        else if (adja_num == RELIVE_NUM)
            next_matrix[x][y] = LIVE; //relive
        else
            next_matrix[x][y] = DEAD; //dead
    })
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
            if (li[y - 1] == LIVE)
                ++ num;
            if (li[y] == LIVE)
                ++ num;
            if (li[y + 1] == LIVE)
                ++ num;
        }
    }
    line(matrix[x + 1]);
    line(matrix[x - 1]);
    if (matrix[x][y - 1] == LIVE)
        ++ num;
    if (matrix[x][y + 1] == LIVE)
        ++ num;
    return num;
}
