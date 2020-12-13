import React, {useEffect, useRef, useLayoutEffect, useState} from 'react';
import d3 from 'd3'
import projectionsConfig from '../VirtualSky/projectionsConfig.js';
import {getGrids, drawGrids} from './grids.js';
import {getStars, drawStars} from './stars.js';
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
  }, []);

  useEffect(() => {
    const gridAz = getGrids(stereo, azOff, config);
    const stars = getStars(stereo, azOff, config);
    const planets = getPlanets(stereo, azOff, config);
    draw(stars, gridAz, planets);
  });

  const draw = (stars, gridAz, planets) =>{
    d3.select("#" + props.id).select("svg").remove();
    const svg = d3.select("#" + props.id).append("svg").attr("width", config.width).attr("height", config.height).style("background", "black");
    if(gridAz){ drawGrids(svg, gridAz); }
    if(stars){ drawStars(svg, stars); }
    if(planets){
      drawPlanets(svg, planets);
      drawPlanetOrbits(svg, planets);
    }
  }

  return (
    <div ref={targetRef} style={{bottom: "0px", top: "0px", right: "0px", left: "0px", position: "absolute"}}>
      <div id={props.id}/>
    </div>
  );
};

export default VirtualSky;
