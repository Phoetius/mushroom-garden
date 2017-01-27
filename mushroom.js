function Mushroom(x,y)
{
    this.element = null;
    
    this.moveable = true;
    this.drag = false;
    this.x = x;
    this.y = y;
    this.offsetX = 0;
    this.offsetY = 0;
    this.bdis = dis(garden.x, garden.y, this.x, this.y);
    this.bdir = dir(garden.x, garden.y, this.x, this.y);
    
    this.install = function()
    {
        this.element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        //this.element.setAttribute("class", "shroom");
        this.element.setAttribute("r", "5");
        this.element.setAttribute("fill", "white");

        this.element.setAttribute("transform", "translate("+this.x+","+this.y+")");
        
        //this.element.style.zIndex = "2";
        
        svg.appendChild(this.element);
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
        this.y = garden.y+ldy(this.bdis/2, this.bdir+garden.rot);
        
        this.element.setAttribute("transform", "translate("+this.x+","+this.y+")");
        this.element.setAttribute("transform", "translate("+this.x+","+this.y+")");
    }

    this.install();
}