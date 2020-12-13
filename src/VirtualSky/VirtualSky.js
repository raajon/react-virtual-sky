import React, {useEffect} from 'react';
import d3 from 'd3'
import {getGrids, drawGrids} from './grids.js';
import {getStars, drawStars} from './stars.js';
import {getPlanets, drawPlanets, drawPlanetOrbits} from './planets.js';
import {stereo} from './projections.js'

const VirtualSky = (props) => {
  const config = props.config;
  const azOff = props.azOff;
  const width = config.width;
  const height = config.height;

  useEffect(() => {
    const gridAz = getGrids(stereo, azOff, config);
    const stars = getStars(stereo, azOff, config);
    const planets = getPlanets(stereo, azOff, config);
    draw(stars, gridAz, planets);
  });

  const draw = (stars, gridAz, planets) =>{
    d3.select("#" + props.id).select("svg").remove();
    const svg = d3.select("#" + props.id).append("svg").attr("width", width).attr("height", height).style("background", "black");
    if(gridAz){ drawGrids(svg, gridAz); }
    if(stars){ drawStars(svg, stars); }
    if(planets){
      drawPlanets(svg, planets);
      drawPlanetOrbits(svg, planets);
    }
  }

  return (
    <div id={props.id}></div>
  );
};

export default VirtualSky;
