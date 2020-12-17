import React, {useEffect, useRef, useLayoutEffect} from 'react';
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

const VirtualSky = (props) => {
  const targetRef = useRef();
  const time = props.config.time || new Date()
  const visibility = props.config.visibility;
  const starMag = visibility.starMag || 2;
  const config = projectionsConfig(props.config.width, props.config.height, props.config.latitude, props.config.longitude, time)
  const azOff = (props.config.azOff%360)-180;

  useLayoutEffect(() => {
    if (targetRef.current) {
      config.width = config.width || targetRef.current.offsetWidth;
      config.height = config.height || targetRef.current.offsetHeight;
    }
  }, [config]);

  useEffect(() => {
    //   showPlanetsLabels: args.showPlanetsLabels,
    //   showConstellationLabels: args.showConstellationLabels,

    const galaxy = visibility.showGalaxy ? getGalaxy(stereo, azOff, config) : null;
    const gridAz = visibility.showAzGrid ? getGrids(stereo, azOff, config) : null;
    const constellationLines = visibility.showConstellations ? getConstellationLines(stereo, azOff, config) : null;
    const constellationLabels = visibility.showConstellationLabels ? getConstellationLabels(stereo, azOff, config) : null;
    const constellationBoundaries = visibility.showConstellationBoundaries ? getBoundaries(stereo, azOff, config) : null;
    const stars = getStars(stereo, azOff, config, starMag);
    const planets = visibility.showPlanets || visibility.showPlanetsOrbit ? getPlanets(stereo, azOff, config) : null;
    const {moon, sun} = visibility.showSunMoon ? getMoonAndSun(stereo, azOff, config) : null;
    draw(visibility, galaxy, stars, constellationLines, constellationLabels, constellationBoundaries, gridAz, planets, moon, sun);
  });

  const draw = (visibility, galaxy, stars, constellationLines, constellationLabels, constellationBoundaries, gridAz, planets, moon, sun) =>{
    d3.select("#" + props.id).select("svg").remove();
    const svg = d3.select("#" + props.id).append("svg").attr("width", config.width).attr("height", config.height).style("background", "black");
    if(galaxy){ drawGalaxy(svg, galaxy); }
    if(gridAz){ drawGrids(svg, gridAz); }
    if(constellationLines){ drawConstellationLines(svg, constellationLines); }
    if(constellationLabels){ drawConstellationLabels(svg, constellationLabels); }
    if(constellationBoundaries){ drawBoundaries(svg, constellationBoundaries); }
    if(stars){ drawStars(svg, stars); }
    if(planets){
      if(visibility.showPlanets) drawPlanets(svg, planets);
      if(visibility.showPlanetsLabels) drawPlanetLabels(svg, planets);
      if(visibility.showPlanetsOrbit) drawPlanetOrbits(svg, planets);
    }
    drawMoonAndSun(svg, moon, sun)
  }

  return (
    <div ref={targetRef} style={{bottom: "0px", top: "0px", right: "0px", left: "0px", position: "absolute"}}>
      <div id={props.id}/>
    </div>
  );
};

export default VirtualSky;
