import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import d3 from 'd3'
import projectionsConfig from '../VirtualSky/projectionsConfig.js';
import {calcConstellationLines, drawConstellationLines} from './constellationLines.js';
import {calcConstellationLabels, drawConstellationLabels} from './constellationLabels.js';
import {calcBoundaries, drawBoundaries} from './constllationBoundaries.js';
import {calcGalaxy, drawGalaxy} from './galaxy.js';
import {calcGridAz, calcGridEq, calcGridGal, drawGridAz, drawGridEq, drawGridGal, drawAz} from './grids.js';
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
let azOffOff = 0;

const VirtualSky = (props) => {
  if(azOff != (props.config.azOff%360)-180){
    azOff = (props.config.azOff%360)-180;
    azOffOff = 0;
  }

  const r2d = 180.0/Math.PI;
  const targetRef = useRef();
  const time = props.config.time || new Date()
  const visibility = props.config.visibility;
  const starMag = visibility.starMag || 2;
  const config = projectionsConfig(props.config.width, props.config.height, props.config.latitude, props.config.longitude, props.config.language, time)
  const skyColors = props.config.skyColors || [ 'rgb(0,0,0)' ];
  const gridAzColor = props.config.gridAzColor;
  const gridEqColor = props.config.gridEqColor;
  const gridGalColor = props.config.gridGalColor;

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

  const draw = (svg, stars) =>{
      const start = new Date().getTime();
      const azO = azOff + azOffOff;
      if(visibility.showGalaxy){
        calcGalaxy(stereo, azO, config);
        drawGalaxy(svg);
      }
      if(visibility.showAzGrid){
        calcGridAz(stereo, azO, config);
        drawGridAz(svg, gridAzColor);
      }
      if(visibility.showEqGrid){
        calcGridEq(stereo, azO, config);
        drawGridEq(svg, gridEqColor);
      }
      if(visibility.showGalGrid){
        calcGridGal(stereo, azO, config);
        drawGridGal(svg, gridGalColor);
      }
      if(visibility.showConstellations){
        calcConstellationLines(stereo, azO, config);
        drawConstellationLines(svg, config);
      }
      if(visibility.showConstellationBoundaries){
        calcBoundaries(stereo, azO, config);
        drawBoundaries(svg, config);
      }
      drawStars(svg, stereo, azO, config, starMag, visibility.showStarLabels);
      if(visibility.showPlanets || visibility.showPlanetsLabels || visibility.showPlanetsOrbit){
        calcPlanets(stereo, azO, config);
        if(visibility.showPlanets) drawPlanets(svg);
        if(visibility.showPlanetsLabels) drawPlanetLabels(svg);
        if(visibility.showPlanetsOrbit) drawPlanetOrbits(svg);
      }
      if(visibility.showSunMoon){
        drawMoonAndSun(svg, stereo, azO, config);
      }
      if(visibility.showConstellationLabels){
        calcConstellationLabels(stereo, azO, config);
        drawConstellationLabels(svg);
      }
      if(visibility.showAzLabels){
        drawAz(svg, stereo, azO, config);
      }
      const rendTime = new Date().getTime() - start + "ms";
      if(visibility.showInfo){
        drawInfo(svg, config, rendTime);
      }
  }

  const drawCanvas = () =>{
    d3.select("#" + props.id).select("svg").remove();
    const svg = d3.select("#" + props.id).append("svg")
        .attr("width", config.width)
        .attr("height", config.height)
        .style("background", "black")
       .on('mousedown', onDown)
       .on('touchstart', onDown)
       .on('mousemove', onMove)
       .on('touchmove', onMove)
       .on('mouseup', onUp)
       .on('touchend', onUp)

       makeBackground(svg);
   return svg;
  }

  const onDown = (d) =>{
    const pos = stereo.xy2azel(...d3.mouse(svg.node()), config.width, config.height);
    clickAz = pos.az;
  }

  const onMove = (d) =>{
    if(clickAz){
      const pos = stereo.xy2azel(...d3.mouse(svg.node()), config.width, config.height);
      // const newAzOff = azOff + (clickAz - pos.az )*r2d;
      azOffOff = (clickAz - pos.az )*r2d;
      draw(svg, stars, planets)
    }
  }

  const onUp = (d) =>{
    const pos = stereo.xy2azel(...d3.mouse(svg.node()), config.width, config.height);
    // azOff = azOff + (clickAz - pos.az )*r2d;
    azOffOff = (clickAz - pos.az )*r2d;
    clickAz = null;
    draw(svg, stars, planets)
  }

  const makeBackground = (svg) =>{
    const grad = svg.append('defs')
       .append('linearGradient')
       .attr('id', 'grad')
       .attr('x1', '0%')
       .attr('x2', '0%')
       .attr('y1', '50%')
       .attr('y2', '100%');

     grad.selectAll('stop')
       .data(skyColors)
       .enter()
       .append('stop')
       .style('stop-color', function(d){ return d; })
       .attr('offset', function(d,i){
         return 100 * (i / (skyColors.length - 1)) + '%';
       })

     svg.append('rect')
       .attr('x', 0)
       .attr('y', 0)
       .attr('width', config.width)
       .attr('height', config.height)
       .style('fill', 'url(#grad)');
  }

  return (
    <div ref={targetRef} style={{bottom: "0px", top: "0px", right: "0px", left: "0px", position: "absolute"}}>
      <div id={props.id}/>
    </div>
  );
};

export default VirtualSky;
