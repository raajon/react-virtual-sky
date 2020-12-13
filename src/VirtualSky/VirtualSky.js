import React, {useEffect, useRef, useLayoutEffect, useState} from 'react';
import d3 from 'd3'
import useWindowDimensions from '../hooks/useWindowDimensions.js';
import {getGrids, drawGrids} from './grids.js';
import {getStars, drawStars} from './stars.js';
import {getPlanets, drawPlanets, drawPlanetOrbits} from './planets.js';
import {stereo} from './projections.js'

const VirtualSky = (props) => {
  const targetRef = useRef();
  // const [dimensions, setDimensions] = useState({ width:0, height: 0 });
  // const screenSize = useWindowDimensions();
  const config = props.config;
  const azOff = props.azOff;
  // const width = config.width || screenSize.width;
  // const height = config.height || screenSize.height;
  // config.width = width;
  // config.height = height;

  useLayoutEffect(() => {
    if (targetRef.current) {
console.log(targetRef.current, targetRef.current.offsetWidth, targetRef.current.offsetHeight)
      config.width = config.width || targetRef.current.offsetWidth;
      config.height = config.height || targetRef.current.offsetHeight;
      // setDimensions({
      //   width: targetRef.current.offsetWidth,
      //   height: targetRef.current.offsetHeight
      // });
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
