function Garden(x, y)
{
    this.element = null;
    this.x = x;
    this.y = y;
    this.targetx = x;
    this.targety = y;
    this.rot = 0;
    this.trot = 0;
    this.tilt = .5;
    this.ttilt = .5;
    this.transition = false;
    this.shrooms = [];
    
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
    
    this.unload = function(dir)
    {
        this.transition = true;
        
        save();
        
        oldgarden = garden;
        
        if(dir=="left")
        {
            gx-=1;
            this.targetx = (window.innerWidth / 2) * 3;
            garden = new Garden(-(window.innerWidth / 2), garden.y);
        }
        else if(dir=="right")
        {
            gx+=1;
            this.targetx = -(window.innerWidth / 2);
            garden = new Garden((window.innerWidth / 2)*3, garden.y);
        }
        else if(dir=="up")
        {
            gy-=
            this.targety = (window.innerHeight / 2)*3;
            garden = new Garden(garden.x, -(window.innerHeight / 2));
        }
        else if(dir=="down")
        {
            gy+=1;
            this.targety = -(window.innerHeight / 2);
            garden = new Garden(garden.x, (window.innerHeight / 2)*3);
        }
        
        load();
        
    }
    
    this.start = function()
    {
        for (_ = 0; _ <= 10; _++)
        {
            this.shrooms.push(new Mushroom(this, Math.random()*180, Math.random()*360, 0));
        }
    }
    
    this.destroy = function()
    {
        this.element.remove();
        
        for(var _=0; _<=this.shrooms.length-1; _++)
		{
			this.shrooms[_].element.remove();
		}
		
		oldgarden = null;
    }
    
    this.update = function()
    {
        if(this.transition==false)
        {
            this.targetx = window.innerWidth / 2;
            this.targety = window.innerHeight / 2;
        }
        
        this.x = lerp(this.x, this.targetx, .04);
        this.y = lerp(this.y, this.targety, .04);
        
        this.element.style.transform = "translate("+this.x+"px,"+this.y+"px) scale(1,"+this.tilt+")";

        this.rot = lerp(this.rot, this.trot, .2);
        this.tilt = lerp(this.tilt, this.ttilt, .2);
        
        if(oldgarden==this)
        {
            if(dis(this.x, this.y, this.targetx, this.targety)<32)
            {
                console.log(this + " : destroyed");
                this.destroy();
            }
        }
    }

    this.install();
}