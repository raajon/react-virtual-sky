const d2r = Math.PI/180;

const init = (width, height, latitude, longitude, language, time) =>{
  const long = setLongitude(longitude);
  return {
    width: width,
    height: height,
    latitude: setLatitude(latitude),
    longitude: long,
    astronomicalTimes: astronomicalTimes(time, long.deg),
    language: language
  }
}

const setLatitude = (l) =>{
	return {'deg':parseFloat(l),'rad':inrangeEl(parseFloat(l)*d2r)};
};

const setLongitude = (l) =>{
	const longitude = {'deg':parseFloat(l),'rad':parseFloat(l)*d2r};
	while(longitude.rad <= -Math.PI) longitude.rad += 2*Math.PI;
	while(longitude.rad > Math.PI) longitude.rad -= 2*Math.PI;
  return longitude;
};

const astronomicalTimes = (clock,lon) =>{
	clock = clock || new Date();
	var JD,JD0,S,T,T0,UT,A,GST,d,LST;
	JD = getJD(clock);
	JD0 = Math.floor(JD-0.5)+0.5;
	S = JD0-2451545.0;
	T = S/36525.0;
	T0 = (6.697374558 + (2400.051336*T) + (0.000025862*T*T))%24;
	if(T0 < 0) T0 += 24;
	UT = (((clock.getUTCMilliseconds()/1000 + clock.getUTCSeconds())/60) + clock.getUTCMinutes())/60 + clock.getUTCHours();
	A = UT*1.002737909;
	T0 += A;
	GST = T0%24;
	if(GST < 0) GST += 24;
	d = (GST + lon/15.0)/24.0;
	d = d - Math.floor(d);
	if(d < 0) d += 1;
	LST = 24.0*d;
	return { GST:GST, LST:LST, JD:JD, clock: clock };
};

const getJD = (clock) =>{
	// The Julian Date of the Unix Time epoch is 2440587.5
	// if(!clock) clock = new Date();
	return ( clock.getTime() / 86400000.0 ) + 2440587.5;
};

const inrangeEl = (a,deg) =>{
	if(deg){
		if(a >= 90) a = 89.99999;
		if(a <= -90) a = -89.99999;
	}else{
		if(a >= Math.PI/2) a = (Math.PI/2)*0.999999;
		if(a <= -Math.PI/2) a = (-Math.PI/2)*0.999999;
	}
	return a;
}

export default init;
