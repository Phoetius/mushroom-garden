// Utility

// TODO: Add to core library
function lerp (start, end, amt)
{
    return (1 - amt) * start + amt * end;
}

// Input

var drag = false;
var mxlast = 0;
var mylast = 0;
datestart = Date.now();

window.onmousemove = function(e)
{
    if(drag)
    {
        garden.trot -= e.clientX - mxlast;
        garden.ttilt += (e.clientY - mylast)*.005;

        if(garden.ttilt>.8)garden.ttilt = .8;
        if(garden.ttilt<.3)garden.ttilt = .3;
        
        mxlast = e.clientX;
        mylast = e.clientY;
    }
}

window.onmouseup = function()
{
    drag=false;
}

window.onmousedown = function(e)
{
    drag = true;
    mxlast = e.clientX;
    mylast = e.clientY;
}

// Start

// Create garden
garden = new Garden(300,300);

// Create shrooms
shrooms = [];

function newgame()
{
    console.log(Date.now());
    for (_ = 0; _ <= 10; _++) {
        var mdis = Math.random() * 180;
        var mdir = Math.random() * 360;

        shrooms.push(new Mushroom(garden.x + ldx(mdis, mdir), garden.y + ldy(mdis, mdir), 0));
    }
}

// Game loop
function update()
{
    window.requestAnimationFrame(update);
    
    // Garden
    garden.update();
    
    // Shrooms
    for(var _=0; _<=shrooms.length-1; _++)
    {
        if(shrooms[_])shrooms[_].update();
    }
}
window.requestAnimationFrame(update);

function save()
{
    console.log(Date.now());
    var saveshrooms = [];
    for(var _=0; _<=shrooms.length-1; _++)
    {
        var cshroom = [];
        cshroom[0] = shrooms[_].x;
        cshroom[1] = shrooms[_].y;
        cshroom[2] = shrooms[_].createdtime;
        saveshrooms.push(cshroom.join(","));
    }
    localStorage.shrooms = saveshrooms.join(";");
}

function load()
{
    var loadshrooms = localStorage.shrooms.split(";");
    for(var _=0; _<=loadshrooms.length-1; _++)
    {
        var cshroom = loadshrooms[_].split(",");
        shrooms.push(new Mushroom(cshroom[0], cshroom[1], cshroom[2]));
    }
}