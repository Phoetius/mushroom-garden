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

for (_ = 0; _ <= 10; _++)
{
    var mdis = Math.random() * 180;
    var mdir = Math.random() * 360;

    shrooms.push(new Mushroom(garden.x + ldx(mdis, mdir), garden.y + ldy(mdis, mdir)));
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
        if(shrooms[_])shrooms[_].grow();
    }
}
window.requestAnimationFrame(update);