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

// File

function newgame()
{
    localStorage.world = "||||||||";
}

function save()
{
    //Mushrooms
    var saveshrooms = [];
    var world = localStorage.world.split("|");
    for(var _=0; _<=garden.shrooms.length-1; _++)
    {
        var cshroom = [];
        cshroom[0] = garden.shrooms[_].bdis;
        cshroom[1] = garden.shrooms[_].bdir;
        cshroom[2] = garden.shrooms[_].createdtime;
        saveshrooms.push(cshroom.join(","));
    }
    world[(gy*3)+gx] = saveshrooms.join(";");
    console.log(world);
    localStorage.world = world.join("|");
}

function load()
{
    var world = localStorage.world.split("|");
    console.log(world);
    
    //Mushrooms
    if(world[(gy*3)+gx]!="")
    {
        var loadshrooms = world[(gy*3)+gx].split(";");
        for (var _ = 0; _ <= loadshrooms.length - 1; _++)
        {
            var cshroom = loadshrooms[_].split(",");
            garden.shrooms.push(new Mushroom(garden, Number(cshroom[0]), Number(cshroom[1]), Number(cshroom[2])));
        }
    }
}

// Start
//datestart = Date.now();
transition = false;
gx = 1;
gy = 1;

garden = new Garden(window.innerWidth / 2,window.innerHeight / 2);
oldgarden = null;

load();

// Game loop
function update()
{
    window.requestAnimationFrame(update);
    
    // Garden
    garden.update();
    
    // Shrooms
    for(var _=0; _<=garden.shrooms.length-1; _++)
    {
        if(garden.shrooms[_])garden.shrooms[_].update();
    }

    if(oldgarden!=null)oldgarden.update();
    if(oldgarden!=null)
    {
        for(var _=0; _<=oldgarden.shrooms.length-1; _++)
        {
            oldgarden.shrooms[_].update();
        }
    }
}
window.requestAnimationFrame(update);