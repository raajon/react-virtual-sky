const d2r = Math.PI/180;
const r2d = 180.0/Math.PI;

// Convert Ecliptic coordinates to x,y position
// Inputs: l (rad), b (rad), local sidereal time
// Returns [x, y (,elevation)]
export const ecliptic2xy = (l,b, projection, az_off, config) =>{
	var pos;
		// if(this.fullsky){
		// 	pos = this.ecliptic2radec(l,b);
		// 	return this.radec2xy(pos.ra,pos.dec);
		// }else{
			pos = ecliptic2azel(l,b,config);
			var el = pos.el*r2d;
			// pos = azel2xy(pos.az-(az_off*d2r), pos.el, projection, az_off, config);
			pos = projection.azel2xy(pos.az-(az_off*d2r), pos.el, config.width, config.height);

			pos.el = el;
			return pos;
		// }
};

// Take input in radians, decimal Sidereal Time and decimal latitude
// Uses method defined in Practical Astronomy (4th ed) by Peter Duffet-Smith and Jonathan Zwart
const ecliptic2azel = (l,b,config,lat) =>{
	const LST = config.astronomicalTimes.LST;
	const JD = config.astronomicalTimes.JD;
	if(!lat) lat = config.latitude.rad;
	var sl,cl,sb,cb,v,e,ce,se,Cprime,s,ST,cST,sST,B,r,sphi,cphi,A,w,theta,psi;
	sl = Math.sin(l);
	cl = Math.cos(l);
	sb = Math.sin(b);
	cb = Math.cos(b);
	v = [cl*cb,sl*cb,sb];
	e = meanObliquity(JD);
	ce = Math.cos(e);
	se = Math.sin(e);
	Cprime = [[1.0,0.0,0.0],[0.0,ce,-se],[0.0,se,ce]];
	s = vectorMultiply(Cprime,v);
	ST = LST*15*d2r;
	cST = Math.cos(ST);
	sST = Math.sin(ST);
	B = [[cST,sST,0],[sST,-cST,0],[0,0,1]];
	r = vectorMultiply(B,s);
	sphi = Math.sin(lat);
	cphi = Math.cos(lat);
	A = [[-sphi,0,cphi],[0,-1,0],[cphi,0,sphi]];
	w = vectorMultiply(A,r);
	theta = Math.atan2(w[1],w[0]);
	psi = Math.asin(w[2]);
	return {az:theta,el:psi};
};
// Convert RA,Dec -> X,Y
// Inputs: RA (rad), Dec (rad)
// Returns [x, y (,elevation)]
export const radec2xy = (ra,dec, projection, az_off, config) =>{
	var coords = coord2horizon(ra, dec, config);
	// Only return coordinates above the horizon
	if(coords[0] > 0){
		var pos = projection.azel2xy(coords[1]-(az_off*d2r),coords[0], config.width, config.height);
		return {x:pos.x,y:pos.y,az:coords[1]*r2d,el:coords[0]*r2d};
	}
	return 0;
};

// Convert AZ,EL -> X,Y
// Inputs: az (degrees), el (degrees), width (px), height (px)
// Output: { x: x, y: y }
export const azel2xy = (az,el, projection, az_off, config) =>{
    var pos = projection.azel2xy(az-(az_off*d2r),el, config.width, config.height);
    return {x:pos.x,y:pos.y};
}

// Convert Galactic -> x,y
// Inputs: longitude (rad), latitude (rad)
export const gal2xy = (l,b, projection, az_off, config) =>{
	const pos = gal2radec(l,b);
	return radec2xy(pos[0],pos[1], projection, az_off, config);
};

// Convert Galactic -> J2000
// Inputs: longitude (rad), latitude (rad)
const gal2radec = (l,b) =>{
	// Using SLALIB values
	return Transform([l,b], [-0.054875539726, 0.494109453312, -0.867666135858, -0.873437108010, -0.444829589425, -0.198076386122, -0.483834985808, 0.746982251810, 0.455983795705],false);
};

const coord2horizon = (ra, dec, config) =>{
	var ha, alt, az, sd, sl, cl;
	// compute hour angle in degrees
	ha = (Math.PI * config.astronomicalTimes.LST/12) - ra;
	sd = Math.sin(dec);
	sl = Math.sin(config.latitude.rad);
	cl = Math.cos(config.latitude.rad);
	// compute altitude in radians
	alt = Math.asin(sd*sl + Math.cos(dec)*cl*Math.cos(ha));
	// compute azimuth in radians
	// divide by zero error at poles or if alt = 90 deg (so we should've already limited to 89.9999)
	az = Math.acos((sd - Math.sin(alt)*sl)/(Math.cos(alt)*cl));
	// choose hemisphere
	if (Math.sin(ha) > 0) az = 2*Math.PI - az;
	return [alt,az];
};

export const stereo = {
  azel2xy: (az,el,w,h) =>{
		var f = 0.42;
		var sinel1 = 0;
		var cosel1 = 1;
		var cosaz = Math.cos((az-Math.PI));
		var sinaz = Math.sin((az-Math.PI));
		var sinel = Math.sin(el);
		var cosel = Math.cos(el);
		var k = 2/(1+sinel1*sinel+cosel1*cosel*cosaz);
		return {x:(w/2+f*k*h*cosel*sinaz),y:(h-f*k*h*(cosel1*sinel-sinel1*cosel*cosaz)),el:el};
	},
	xy2azel: (x, y, w, h) =>{
		var f = 0.42;
		var sinel1 = 0;
		var cosel1 = 1;
		var X = (x - w/2) / h;
		var Y = (h - y)/h;
		var R = f;

		var P = Math.sqrt(X * X + Y * Y);
		var c = 2 * Math.atan2(P, 2*R);

		var el = Math.asin(Math.cos(c)*sinel1 + Y * Math.sin(c) * cosel1 / P);
		var az = Math.PI + Math.atan2(X * Math.sin(c), P * cosel1 * Math.cos(c) - Y * sinel1 * Math.sin(c));

		return {az:az, el:el};
	}
}

// When provided with an array of Julian dates, ra, dec, and magnitude this will interpolate to the nearest
// data = [jd_1, ra_1, dec_1, mag_1, jd_2, ra_2, dec_2, mag_2....]
export const interpolate = (jd,data) =>{
	var mindt = jd;	// Arbitrary starting value in days
	var mini = 0;	// index where we find the minimum
	for(var i = 0 ; i < data.length ; i+=4){
		// Find the nearest point to now
		var dt = (jd-data[i]);
		if(Math.abs(dt) < Math.abs(mindt)){ mindt = dt; mini = i; }
	}
	var dra,ddec,dmag,pos_2,pos_1,fract;
	if(mindt >= 0){
		pos_2 = mini+1+4;
		pos_1 = mini+1;
		fract = mindt/Math.abs(data[pos_2-1]-data[pos_1-1]);
	}else{
		pos_2 = mini+1;
		pos_1 = mini+1-4;
		fract = (1+(mindt)/Math.abs(data[pos_2-1]-data[pos_1-1]));
	}
	// We don't want to attempt to find positions beyond the edges of the array
	if(pos_2 > data.length || pos_1 < 0){
		dra = data[mini+1];
		ddec = data[mini+2];
		dmag = data[mini+3];
	}else{
		dra = (Math.abs(data[pos_2]-data[pos_1]) > 180) ? (data[pos_1]+(data[pos_2]+360-data[pos_1])*fract)%360 : (data[pos_1]+(data[pos_2]-data[pos_1])*fract)%360;
		ddec = data[pos_1+1]+(data[pos_2+1]-data[pos_1+1])*fract;
		dmag = data[pos_1+2]+(data[pos_2+2]-data[pos_1+2])*fract;
	}
	return { ra: dra, dec:ddec, mag:dmag};
}

const vectorMultiply = (A,B) =>{
	if(B.length > 0){
		// 2D (3x3)x(3x3) or 1D (3x3)x(3x1)
		if(B[0].length > 0) return [[(A[0][0]*B[0][0]+A[0][1]*B[1][0]+A[0][2]*B[2][0]),(A[0][0]*B[0][1]+A[0][1]*B[1][1]+A[0][2]*B[2][1]),(A[0][0]*B[0][2]+A[0][1]*B[1][2]+A[0][2]*B[2][2])],
									[(A[1][0]*B[0][0]+A[1][1]*B[1][0]+A[1][2]*B[2][0]),(A[1][0]*B[0][1]+A[1][1]*B[1][1]+A[1][2]*B[2][1]),(A[1][0]*B[0][2]+A[1][1]*B[1][2]+A[1][2]*B[2][2])],
									[(A[2][0]*B[0][0]+A[2][1]*B[1][0]+A[2][2]*B[2][0]),(A[2][0]*B[0][1]+A[2][1]*B[1][1]+A[2][2]*B[2][1]),(A[2][0]*B[0][2]+A[2][1]*B[1][2]+A[2][2]*B[2][2])]];
		else return [(A[0][0]*B[0] + A[0][1]*B[1] + A[0][2]*B[2]),(A[1][0]*B[0] + A[1][1]*B[1] + A[1][2]*B[2]),(A[2][0]*B[0] + A[2][1]*B[1] + A[2][2]*B[2])];
	}
};

// Input is Julian Date
// Uses method defined in Practical Astronomy (4th ed) by Peter Duffet-Smith and Jonathan Zwart
const meanObliquity = (JD) =>{
	var T,T2,T3;
	T = (JD-2451545.0)/36525;	// centuries since 2451545.0 (2000 January 1.5)
	T2 = T*T;
	T3 = T2*T;
	return (23.4392917 - 0.0130041667*T - 0.00000016667*T2 + 0.0000005027778*T3)*d2r;
};


// Convert from B1875 to J2000
// Using B = 1900.0 + (JD − 2415020.31352) / 365.242198781 and p73 Practical Astronomy With A Calculator
export const fk1tofk5 = (a,b) =>{
	// Convert from B1875 -> J2000
	return Transform([a,b], [0.9995358730015703, -0.02793693620138929, -0.012147682028606801, 0.027936935758478665, 0.9996096732234282, -0.00016976035344812515, 0.012147683047201562, -0.00016968744936278707, 0.9999261997781408]);
};

// Input is a two element position (degrees) and rotation matrix
// Output is a two element position (degrees)
const Transform = (p, rot, indeg) =>{
	if(indeg){
		p[0] *= this.d2r;
		p[1] *= this.d2r;
	}
	var cp1 = Math.cos(p[1]);
	var m = [Math.cos(p[0])*cp1, Math.sin(p[0])*cp1, Math.sin(p[1])];
	var s = [m[0]*rot[0] + m[1]*rot[1] + m[2]*rot[2], m[0]*rot[3] + m[1]*rot[4] + m[2]*rot[5], m[0]*rot[6] + m[1]*rot[7] + m[2]*rot[8] ];
	var r = Math.sqrt(s[0]*s[0] + s[1]*s[1] + s[2]*s[2]);
	var b = Math.asin(s[2]/r); // Declination in range -90 -> +90
	var cb = Math.cos(b);
	var a = Math.atan2(((s[1]/r)/cb),((s[0]/r)/cb));
	if (a < 0) a += Math.PI*2;
	if(indeg) return [a*r2d,b*r2d];
	else return [a,b];
};
