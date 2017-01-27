// Convert degrees to radians
function rad(dir)
{
	return (dir/180)*Math.PI;
}

// Convert radians to degrees
function deg(r)
{
	return (r*180)/Math.PI;
}

//
function ldx(len, dir)
{
	return Math.cos(rad(-dir))*len;
}

function ldy(len, dir)
{
	return -Math.sin(rad(-dir))*len;
}

// Calculates the direction from point a to point b
function dir(x1,y1,x2,y2)
{
	return deg(Math.atan2(y2 - y1, x2 - x1));
}

// Calculates the distance from point a to point b
function dis(x1,y1,x2,y2)
{
	return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}