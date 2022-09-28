import React, {useState, useEffect} from 'react';
import projectionsConfig from '../VirtualSky/projectionsConfig.js';
import { drawCanvas, drawGrid, drawMark, drawValue } from './drawers.js';

let svg = null;

const PolarAligment = (props) => {
  const [value, setValue] = useState(0);
  const [rawValue, setRawValue] = useState(0);
  const [refresh, setRefresh] = useState(true);

  const size = props.config.size;
  const polarStart = 2.53019;


  useEffect(() => {
    refresh && draw();
    setRefresh(false);
  });

  const draw = () =>{
    const time = props.config.time || new Date();
    const config = projectionsConfig(null, null, props.config.latitude, props.config.longitude, props.config.language, new Date())
    const fixed = config.astronomicalTimes.LST - polarStart;
    const rv = (17.68 - fixed/2) % 12;
    const v = Math.floor(rv) + ":" + String(Math.round((rv - Math.floor(rv))*60)).padStart(2, '0');
    setRawValue(rv);
    setValue(v);

    svg = drawCanvas(props.id, size);
    drawGrid(svg, size, "#F00000");
    drawMark(svg, rv, size, "#F00000");
    drawValue(svg, v, size, "#F00000");
  }

  const anwser = {
    polarStart:polarStart,
    polarAligment:{
      rawValue: rawValue,
      value: value,
      deg: rawValue * 360 / 12
    }
  }

  return (
      <div style={{bottom: "0px", top: "0px", right: "0px", left: "0px", position: "absolute"}}>
        <div id={props.id}/>
        <pre>{JSON.stringify(anwser, null, 2)}</pre>
      </div>
    );
};

export default PolarAligment;
