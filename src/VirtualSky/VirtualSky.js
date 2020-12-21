import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import d3 from 'd3'
import projectionsConfig from '../VirtualSky/projectionsConfig.js';
import {calcConstellationLines, drawConstellationLines} from './constellationLines.js';
import {calcConstellationLabels, drawConstellationLabels} from './constellationLabels.js';
import {calcBoundaries, drawBoundaries} from './constllationBoundaries.js';
import {calcGalaxy, drawGalaxy} from './galaxy.js';
import {calcGrids, drawGridAz} from './grids.js';
import {drawStars} from './stars.js';
import {drawMoonAndSun} from './sunAndMoon.js';
import {calcPlanets, drawPlanets, drawPlanetOrbits, drawPlanetLabels} from './planets.js';
import {drawInfo} from './info.js';
import {stereo} from './projections.js'

let  clickAz = null;
let stars = [];
let planets = [];
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
    svg = drawCanvas();
    draw(svg, azOff, stars);
  });

  const draw = (svg, azOff, stars) =>{
      const start = new Date().getTime();
      if(visibility.showGalaxy){
        calcGalaxy(stereo, azOff, config);
        drawGalaxy(svg);
      }
      if(visibility.showAzGrid){
        calcGrids(stereo, azOff, config);
        drawGridAz(svg);
      }
      if(visibility.showConstellations){
        calcConstellationLines(stereo, azOff, config);
        drawConstellationLines(svg, config);
      }
      if(visibility.showConstellationBoundaries){
        calcBoundaries(stereo, azOff, config);
        drawBoundaries(svg, config);
      }
      drawStars(svg, stereo, azOff, config, starMag);
      if(visibility.showPlanets || visibility.showPlanetsLabels || visibility.showPlanetsOrbit){
        calcPlanets(stereo, azOff, config);
        if(visibility.showPlanets) drawPlanets(svg);
        if(visibility.showPlanetsLabels) drawPlanetLabels(svg);
        if(visibility.showPlanetsOrbit) drawPlanetOrbits(svg);
      }
      if(visibility.showSunMoon){
        drawMoonAndSun(svg, stereo, azOff, config);
      }
      if(visibility.showConstellationLabels){
        calcConstellationLabels(stereo, azOff, config);
        drawConstellationLabels(svg);
      }
      const rendTime = new Date().getTime() - start + "ms";
      drawInfo(svg, config, rendTime);
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
           draw(svg, newAzOff, stars, planets)
         }
       })
       .on('mouseup',(d) =>{
         const pos = stereo.xy2azel(...d3.mouse(svg.node()), config.width, config.height);
         azOff = azOff + (clickAz - pos.az )*r2d;
         clickAz = null;
         draw(svg, azOff, stars, planets)
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
