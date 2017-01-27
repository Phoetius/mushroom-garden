function Garden(x, y)
{
    this.element = null;
    this.x = x;
    this.y = y;
    this.rot = 0;
    this.trot = 0;
    
    this.install = function()
    {
        this.element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.element.setAttribute("r", "200");
        
        this.element.setAttribute("transform", "translate("+this.x+","+this.y+") scale(1,.5)" );
        
        this.element.setAttribute("fill", "black");
        
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
        this.rot = lerp(this.rot, this.trot, .2);
    }

    this.install();
}