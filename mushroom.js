function Mushroom(par,bdis,bdir,time)
{
    this.element = null;
    this.p = null;
    
    this.par = par;
    this.moveable = true;
    this.drag = false;
    this.x = 0;
    this.y = 0;
    this.bdis = bdis;
    this.bdir = bdir;
    this.scale = 0;
    this.delay = Math.random()*1;
    this.createdtime = time || Date.now();
    this.age = 0;
    
    this.install = function()
    {
        // Main SVG
        this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.element.style.position = "fixed";
        this.element.style.overflow = "visible";
        this.element.style.pointerEvents = "none";
        this.element.style.transformOrigin = "0px 0px";
        this.element.style.opacity = "0";
        this.element.style.animationFillMode = "forwards";
        this.element.style.animationName = "fadein";
        this.element.style.animationDuration = ".7s";
        this.element.style.animationDelay = this.delay.toString() + "s";
        document.body.appendChild(this.element);
        
        // Shroom instance
        var u = document.createElementNS("http://www.w3.org/2000/svg", "use");
        u.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#shroombox");
        var clr = Math.floor(Math.random()*159+70);//(max-min)+min 500-837 337
        u.style.fill = "rgb("+clr+","+clr+","+clr+")";
        this.element.appendChild(u);
        
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
    
    //Increase scale
    this.grow = function()
    {
        this.scale = this.age/5000;
        if(this.scale>1)this.scale=1;
    }
    
    
    this.update = function()
    {
        this.age = Date.now()-this.createdtime;
        
        this.x = par.x+ldx(this.bdis, this.bdir+par.rot);
        this.y = par.y+ldy(this.bdis*par.tilt, this.bdir+par.rot);

        this.element.style.transform = "translate("+(this.x)+"px,"+(this.y)+"px)" + "scale("+this.scale+","+this.scale+")";

        this.element.style.zIndex = Math.floor(this.y);
        
        this.grow();
    }

    this.install();
}