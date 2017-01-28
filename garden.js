function Garden(x, y)
{
    this.element = null;
    this.x = x;
    this.y = y;
    this.rot = 0;
    this.trot = 0;
    this.tilt = 0;
    this.ttilt = .5;
    
    this.install = function()
    {
        this.element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.element.setAttribute("r", "200");        
        this.element.setAttribute("fill", "rgb(50,50,50");
        this.element.setAttribute("transform", "translate("+this.x+","+this.y+") scale(1,.5)" );
        
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
        this.x = window.innerWidth/2;
        this.y = window.innerHeight/2;
        
        this.element.setAttribute("transform", "translate("+this.x+","+this.y+") scale(1,"+this.tilt+")" );

        this.rot = lerp(this.rot, this.trot, .2);
        this.tilt = lerp(this.tilt, this.ttilt, .2);
    }

    this.install();
}