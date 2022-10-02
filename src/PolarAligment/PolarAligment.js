import React, {useState, useEffect} from 'react';
import projectionsConfig from '../VirtualSky/projectionsConfig.js';
import { drawCanvas, drawGrid, drawMark, drawValue } from './drawers.js';

let svg = null;

const PolarAligment = (props) => {
  const [refresh, setRefresh] = useState(true);

  const size = props.config.size;
  const polarStart = 2.53019;


  useEffect(() => {
    draw();
  //   refresh && draw();
  //   setRefresh(false);
  },[props.config]);
  //
  const draw = () =>{
    const time = props.config.time || new Date();
    const config = projectionsConfig(null, null, props.config.latitude, props.config.longitude, props.config.language, time)
    const fixed = config.astronomicalTimes.LST - polarStart;
    const rv = (17.68 - fixed/2) % 12;

    svg = drawCanvas(props.id, size);
    drawGrid(svg, size, props.config.color);
    drawMark(svg, rv, size, props.config.color);
    drawValue(svg, rv, size, props.config.color, props.config.language);
  }


  return (
      <div id={props.id}/>
  );
};

export default PolarAligment;
