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
    this.delay = Math.random()*1;
    
    this.install = function()
    {
        this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.element.style.position = "fixed";
        this.element.style.overflow = "visible";
        this.element.style.pointerEvents = "none";
        this.element.style.transformOrigin = "0,0";
        this.element.style.opacity = "0";
        this.element.style.animationFillMode = "forwards";
        this.element.style.animationName = "fadein";
        this.element.style.animationDuration = ".7s";
        this.element.style.animationDelay = this.delay.toString() + "s";
        
        document.body.appendChild(this.element);
        
        var element = document.createElementNS("http://www.w3.org/2000/svg", "use");
        element.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#shroombox");
        this.element.appendChild(element);
        
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
        
        //this.element.style.left = (this.x-12) + "px";
        //this.element.style.top = (this.y-35) + "px";

        this.element.style.transform = "translate("+(this.x)+"px,"+(this.y)+"px)" + "scale("+this.scale+","+this.scale+")";

        this.element.style.zIndex = Math.floor(this.y);
    }

    this.install();
}