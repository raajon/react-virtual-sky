import React, {useEffect, useRef, useLayoutEffect} from 'react';
import d3 from 'd3'
import projectionsConfig from '../VirtualSky/projectionsConfig.js';
import {getConstellationLines, drawConstellationLines} from './constellationLines.js';
import {getGalaxy, drawGalaxy} from './galaxy.js';
import {getGrids, drawGrids} from './grids.js';
import {getStars, drawStars} from './stars.js';
import {getMoonAndSun, drawMoonAndSun} from './sunAndMoon.js';
import {getPlanets, drawPlanets, drawPlanetOrbits} from './planets.js';
import {stereo} from './projections.js'

const VirtualSky = (props) => {
  const targetRef = useRef();
  const config = projectionsConfig(props.config.width, props.config.height, props.config.latitude, props.config.longitude, props.config.time)
  const azOff = props.config.azOff;

  useLayoutEffect(() => {
    if (targetRef.current) {
      config.width = config.width || targetRef.current.offsetWidth;
      config.height = config.height || targetRef.current.offsetHeight;
    }
  }, [config]);

  useEffect(() => {
    const galaxy = getGalaxy(stereo, azOff, config);
    const gridAz = getGrids(stereo, azOff, config);
    const constellationLines = getConstellationLines(stereo, azOff, config);
    const stars = getStars(stereo, azOff, config);
    const planets = getPlanets(stereo, azOff, config);
    const {moon, sun} = getMoonAndSun(stereo, azOff, config);
    draw(galaxy, stars, constellationLines, gridAz, planets, moon, sun);
  });

  const draw = (galaxy, stars, constellationLines, gridAz, planets, moon, sun) =>{
    d3.select("#" + props.id).select("svg").remove();
    const svg = d3.select("#" + props.id).append("svg").attr("width", config.width).attr("height", config.height).style("background", "black");
    if(galaxy){ drawGalaxy(svg, galaxy); }
    if(gridAz){ drawGrids(svg, gridAz); }
    if(constellationLines){ drawConstellationLines(svg, constellationLines); }

    if(stars){ drawStars(svg, stars); }
    if(planets){
      drawPlanets(svg, planets);
      drawPlanetOrbits(svg, planets);
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
