import {ecliptic2xy} from './projections.js';

const d2r = Math.PI/180;

export const drawMoonAndSun = (svg, projection, azOff, config) =>{
    const {sun, moon} = getMoonAndSun(projection, azOff, config)
    const circles = svg.selectAll('.moonsun');
    const databoundCircles = circles.data([moon,sun]);
    databoundCircles.enter().append('circle').attr('class','moonsun');
    databoundCircles.exit().remove();
    databoundCircles
      .attr("cx", (d) =>{ return d.x; })
      .attr("cy", (d) =>{ return d.y; })
      .attr("r", (d) =>{ return d.r; })
      .style("fill", (d) =>{ return d.colour; });
}


export const getMoonAndSun = (projection, azOff, config) =>{
  const JD = config.astronomicalTimes.JD;
  const s = sunPos(JD)
  const sun = ecliptic2xy(s.lon*d2r, s.lat*d2r, projection, azOff, config);
  const m = moonPos(JD, s)
  const moon = ecliptic2xy(m.lon*d2r, m.lat*d2r, projection, azOff, config);
  return{
    sun:{...sun, r:10, colour:"yellow"},
    moon:{...moon, r:10, colour:"rgb(153,153,153)"}
  }
}


// Uses algorithm defined in Practical Astronomy (4th ed) by Peter Duffet-Smith and Jonathan Zwart
export const moonPos = (JD, sun) =>{
	var lo,Po,No,i,l,Mm,N,C,Ev,sinMo,Ae,A3,Mprimem,Ec,A4,lprime,V,lprimeprime,Nprime,lppNp,sinlppNp,y,x,lm,Bm;
	lo = 91.929336;	// Moon's mean longitude at epoch 2010.0
	Po = 130.143076;	// mean longitude of the perigee at epoch
	No = 291.682547;	// mean longitude of the node at the epoch
	i = 5.145396;	// inclination of Moon's orbit
	// e = 0.0549;	// eccentricity of the Moon's orbit
	l = (13.1763966*sun.D + lo)%360;
	if(l < 0) l += 360;
	Mm = (l - 0.1114041*sun.D - Po)%360;
	if(Mm < 0) Mm += 360;
	N = (No - 0.0529539*sun.D)%360;
	if(N < 0) N += 360;
	C = l-sun.lon;
	Ev = 1.2739*Math.sin((2*C-Mm)*d2r);
	sinMo = Math.sin(sun.Mo*d2r);
	Ae = 0.1858*sinMo;
	A3 = 0.37*sinMo;
	Mprimem = Mm + Ev -Ae - A3;
	Ec = 6.2886*Math.sin(Mprimem*d2r);
	A4 = 0.214*Math.sin(2*Mprimem*d2r);
	lprime = l + Ev + Ec -Ae + A4;
	V = 0.6583*Math.sin(2*(lprime-sun.lon)*d2r);
	lprimeprime = lprime + V;
	Nprime = N - 0.16*sinMo;
	lppNp = (lprimeprime-Nprime)*d2r;
	sinlppNp = Math.sin(lppNp);
	y = sinlppNp*Math.cos(i*d2r);
	x = Math.cos(lppNp);
	lm = Math.atan2(y,x)/d2r + Nprime;
	Bm = Math.asin(sinlppNp*Math.sin(i*d2r))/d2r;
	if(lm > 360) lm -= 360;
	return {lon:lm,lat:Bm};
};

// Uses algorithm defined in Practical Astronomy (4th ed) by Peter Duffet-Smith and Jonathan Zwart
const sunPos = (JD) =>{
	var D,eg,wg,e,N,Mo,v,lon,lat;
	D = (JD-2455196.5);	// Number of days since the epoch of 2010 January 0.0
	// Calculated for epoch 2010.0. If T is the number of Julian centuries since 1900 January 0.5 = (JD-2415020.0)/36525
	eg = 279.557208;	// mean ecliptic longitude in degrees = (279.6966778 + 36000.76892*T + 0.0003025*T*T)%360;
	wg = 283.112438;	// longitude of the Sun at perigee in degrees = 281.2208444 + 1.719175*T + 0.000452778*T*T;
	e = 0.016705;	// eccentricity of the Sun-Earth orbit in degrees = 0.01675104 - 0.0000418*T - 0.000000126*T*T;
	N = ((360/365.242191)*D)%360;
	if(N < 0) N += 360;
	Mo = (N + eg - wg)%360;	// mean anomaly in degrees
	if(Mo < 0) Mo += 360;
	v = Mo + (360/Math.PI)*e*Math.sin(Mo*Math.PI/180);
	lon = v + wg;
	if(lon > 360) lon -= 360;
	lat = 0;
	return {lat:lat,lon:lon,Mo:Mo,D:D,N:N};
};
