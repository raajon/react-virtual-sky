const d2r = Math.PI/180;
const r2d = 180.0/Math.PI;

export const radec2xy = (ra,dec, projection, az_off, config) =>{
	var coords = coord2horizon(ra, dec, config);
	// Only return coordinates above the horizon
	if(coords[0] > 0){
		var pos = projection.azel2xy(coords[1]-(az_off*d2r),coords[0], config.width, config.height);
		return {x:pos.x,y:pos.y,az:coords[1]*r2d,el:coords[0]*r2d};
	}
	return 0;
};


export const azel2xy = (az,el, projection, az_off, config) =>{
    var pos = projection.azel2xy(az-(az_off*d2r),el, config.width, config.height);
    return {x:pos.x,y:pos.y};
}

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

		return [az, el];
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
