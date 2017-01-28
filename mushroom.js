function Mushroom(x,y)
{
    this.element = null;
    this.p = null;
    
    this.moveable = true;
    this.drag = false;
    this.x = x;
    this.y = y;
    this.bdis = dis(garden.x, garden.y, this.x, this.y);
    this.bdir = dir(garden.x, garden.y, this.x, this.y);
    this.scale = Math.random()*.5+.5;
    
    this.install = function()
    {
        this.element = document.createElement("img");

        var i = Math.floor(Math.random()*4);
        var imgs = ["shroomBox70.svg", "shroomBox137.svg", "shroomBox171.svg", "shroomBox229.svg"]
        this.element.setAttribute("src", imgs[i])
        this.element.style.position = "fixed";
        this.element.style.zIndex = 100;
    
        document.body.appendChild(this.element);

        this.element.style.transform = "scale("+this.scale+","+this.scale+")";

        this.addmousedown(this.element, this);
    }
    
    this.addmousedown = function(elem, obj)
    {
        elem.addEventListener("mousedown", function(){obj.mousedown(event);}, false);
    }

    this.mousedown = function(e)
    {
        e.stopPropagation();
    }
    
    this.update = function()
    {
        this.x = garden.x+ldx(this.bdis, this.bdir+garden.rot);
        this.y = garden.y+ldy(this.bdis*garden.tilt, this.bdir+garden.rot);

        console.log(this.x)
        
        //this.element.style.left = (this.x-12) + "px";
        //this.element.style.top = (this.y-35) + "px";

        this.element.style.transform = "translate("+(this.x-12)+"px,"+(this.y-35)+"px)" + "scale("+this.scale+","+this.scale+")";

        this.element.style.zIndex = Math.floor(this.y);
    }

    this.install();
}