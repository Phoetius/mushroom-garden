function Garden(x, y)
{
    this.element = null;
    this.x = x;
    this.y = y;
    this.rot = 0;
    this.trot = 0;
    this.tilt = .5;
    this.ttilt = .5;
    
    this.install = function()
    {
        this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.element.style.position = "fixed";
        this.element.style.overflow = "visible";
        this.element.style.pointerEvents = "none";
        this.element.style.transformOrigin = "0px 0px";
        this.element.style.transform = "translate("+this.x+"px,"+this.y+"px)";
        
        document.body.appendChild(this.element);
        
        var element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        element.setAttribute("r", "200");
        element.style.fill = "rgb(50,50,50)";
        this.element.appendChild(element);
        
        //this.addmousedown(this.element, this);
    }
    
    this.addmousedown = function(elem, obj)
    {
        elem.addEventListener("mousedown", function(){obj.mousedown(event);}, false);
    }
    
    
    this.mousedown = function(e)
    {
        //e.stopPropagation();
    }
    
    this.update = function()
    {
        this.x = window.innerWidth/2;
        this.y = window.innerHeight/2;
        
        this.element.style.transform = "translate("+this.x+"px,"+this.y+"px) scale(1,"+this.tilt+")";

        this.rot = lerp(this.rot, this.trot, .2);
        this.tilt = lerp(this.tilt, this.ttilt, .2);
    }

    this.install();
}