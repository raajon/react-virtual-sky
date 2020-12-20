import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import d3 from 'd3'
import projectionsConfig from '../VirtualSky/projectionsConfig.js';
import {getConstellationLines, drawConstellationLines} from './constellationLines.js';
import {getConstellationLabels, drawConstellationLabels} from './constellationLabels.js';
import {getBoundaries, drawBoundaries} from './constllationBoundaries.js';
import {getGalaxy, drawGalaxy} from './galaxy.js';
import {getGrids, drawGrids} from './grids.js';
import {getStars, drawStars} from './stars.js';
import {getMoonAndSun, drawMoonAndSun} from './sunAndMoon.js';
import {getPlanets, drawPlanets, drawPlanetOrbits, drawPlanetLabels} from './planets.js';
import {stereo} from './projections.js'

let  clickAz = null;
let stars = [];
let svg = null;
let azOff = 0;

const VirtualSky = (props) => {
  azOff = (props.config.azOff%360)-180;

  const r2d = 180.0/Math.PI;
  const targetRef = useRef();
  const time = props.config.time || new Date()
  const visibility = props.config.visibility;
  const starMag = visibility.starMag || 2;
  const config = projectionsConfig(props.config.width, props.config.height, props.config.latitude, props.config.longitude, time)


  useLayoutEffect(() => {
    if (targetRef.current) {
      config.width = config.width || targetRef.current.offsetWidth;
      config.height = config.height || targetRef.current.offsetHeight;
    }
  }, [config]);

  useEffect(() => {
    //   showPlanetsLabels: args.showPlanetsLabels,
    //   showConstellationLabels: args.showConstellationLabels,
console.log("useEffect");
    svg = drawCanvas();
    const galaxy = visibility.showGalaxy ? getGalaxy(stereo, azOff, config) : null;
    const gridAz = visibility.showAzGrid ? getGrids(stereo, azOff, config) : null;
    const constellationLines = visibility.showConstellations ? getConstellationLines(stereo, azOff, config) : null;
    const constellationLabels = visibility.showConstellationLabels ? getConstellationLabels(stereo, azOff, config) : null;
    const constellationBoundaries = visibility.showConstellationBoundaries ? getBoundaries(stereo, azOff, config) : null;
    stars = getStars(starMag)
    const planets = visibility.showPlanets || visibility.showPlanetsOrbit ? getPlanets(stereo, azOff, config) : null;
    const moonAndSun = visibility.showSunMoon ? getMoonAndSun(stereo, azOff, config) : null;
    // draw(visibility, galaxy, constellationLines, constellationLabels, constellationBoundaries, gridAz, planets, moonAndSun);
    draw2(svg, azOff, stars);

  });

//   const draw = (visibility, galaxy, constellationLines, constellationLabels, constellationBoundaries, gridAz, planets, moonAndSun) =>{
//     const svg = drawCanvas();
// console.log("draw");
//     if(galaxy){ drawGalaxy(svg, galaxy); }
//     if(gridAz){ drawGrids(svg, gridAz); }
//     if(constellationLines){ drawConstellationLines(svg, constellationLines); }
//     if(constellationLabels){ drawConstellationLabels(svg, constellationLabels); }
//     if(constellationBoundaries){ drawBoundaries(svg, constellationBoundaries); }
//     if(stars){ drawStars(svg, stars, stereo, azOff, config); }
//     if(planets){
//       if(visibility.showPlanets) drawPlanets(svg, planets);
//       if(visibility.showPlanetsLabels) drawPlanetLabels(svg, planets);
//       if(visibility.showPlanetsOrbit) drawPlanetOrbits(svg, planets);
//     }
//     if(moonAndSun){
//       drawMoonAndSun(svg, moonAndSun.moon, moonAndSun.sun);
//     }
//   }

  const draw2 = (svg, azOff, stars) =>{
      if(stars){drawStars(svg, stars, stereo, azOff, config); }
  }

  const drawCanvas = () =>{
    d3.select("#" + props.id).select("svg").remove();
    const svg = d3.select("#" + props.id).append("svg")
        .attr("width", config.width)
        .attr("height", config.height)
        .style("background", "black")
       .on('mousedown', (d) =>{
         const pos = stereo.xy2azel(...d3.mouse(svg.node()), config.width, config.height);
         clickAz = pos.az;
       })
       .on('mousemove', (d)=>{
         if(clickAz){
           const pos = stereo.xy2azel(...d3.mouse(svg.node()), config.width, config.height);
           const newAzOff = azOff + (clickAz - pos.az )*r2d;
           draw2(svg, newAzOff, stars)
         }
       })
       .on('mouseup',(d) =>{
         const pos = stereo.xy2azel(...d3.mouse(svg.node()), config.width, config.height);
         const newAzOff = azOff + (clickAz - pos.az )*r2d;
         clickAz = null;
         draw2(svg, newAzOff, stars)
       })
   return svg;
  }

  return (
    <div ref={targetRef} style={{bottom: "0px", top: "0px", right: "0px", left: "0px", position: "absolute"}}>
      <div id={props.id}/>
    </div>
  );
};

export default VirtualSky;
