import {azel2xy} from './projections.js';
import d3 from 'd3'

const d2r = Math.PI/180;
let grid = [];

export const calcGrids = (stereo, azOff, config) =>{
  grid = [];
  for(let j =-80; j<=90; j+=40){
    const line = [];
    for(let i =0; i<=360; i+=10){
      line.push({ra: i, dec: j, ...azel2xy(i*d2r, j*d2r, stereo, azOff, config)});
    }
    grid.push(line.filter(l=> !isNaN(l.x) && !isNaN(l.y) ));
  }

  for(let i =0; i<=360; i+=30){
    const line = [];
    for(let j =-85; j<=85; j+=5){
      line.push({ra: i, dec: j, ...azel2xy(i*d2r, j*d2r, stereo, azOff, config)});
    }
    grid.push(line.filter(l=> !isNaN(l.x) && !isNaN(l.y) ));
  }
}

export const drawGridAz = (svg) =>{
    const lines = svg.selectAll('.gridaz');
    const databoundGridAz = lines.data(grid);
    databoundGridAz.enter().append('path').attr('class','gridaz');;
    databoundGridAz.exit().remove();
    databoundGridAz
        .attr("d", d=>lineFunction(d))
        .attr("stroke", "#44f6")
        .attr("stroke-width", 1)
        .attr("fill", "none");
}


const lineFunction = d3.svg.line()
     .x(d =>{ return d.x; })
     .y(d =>{ return d.y; })
     .interpolate("linear");
