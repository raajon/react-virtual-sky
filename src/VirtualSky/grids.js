import {azel2xy} from './projections.js';
import d3 from 'd3'

const d2r = Math.PI/180;

export const getGrids = (stereo, azOff, config) =>{
  const gridAz = [];
  for(let j =-80; j<=90; j+=40){
    const line = [];
    for(let i =0; i<=360; i+=10){
      line.push({ra: i, dec: j, ...azel2xy(i*d2r, j*d2r, stereo, azOff, config)});
    }
    gridAz.push(line.filter(l=> !isNaN(l.x) && !isNaN(l.y) ));
  }

  for(let i =0; i<=360; i+=30){
    const line = [];
    for(let j =-85; j<=85; j+=5){
      line.push({ra: i, dec: j, ...azel2xy(i*d2r, j*d2r, stereo, azOff, config)});
    }
    gridAz.push(line.filter(l=> !isNaN(l.x) && !isNaN(l.y) ));
  }
  return gridAz
}

export const drawGrids = (svg, gridAz) =>{
  var lineFunction = d3.svg.line()
       .x(d =>{ return d.x; })
       .y(d =>{ return d.y; })
       .interpolate("linear");
  gridAz.forEach((line, i) => {
      svg.append("path")
          .attr("d", lineFunction(line))
          .attr("stroke", "#44f6")
          .attr("stroke-width", 1)
          .attr("fill", "none");
   });
}
