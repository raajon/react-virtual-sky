import {azel2xy, ecliptic2xy, radec2xy, gal2xy} from './projections.js';
import d3 from 'd3'

const d2r = Math.PI/180;
let gridAz = [];
let gridEq = [];
let gridGal = [];

export const calcGridAz = (stereo, azOff, config) =>{
  gridAz = [];
  for(let j =-80; j<=80; j+=40){
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
}

export const calcGridEq = (stereo, azOff, config) =>{
  gridEq = [];
  for(let j =-80; j<=80; j+=40){
    const line = [];
    for(let i =0; i<=360; i+=10){
      line.push({ra: i, dec: j, ...radec2xy(i*d2r, j*d2r, stereo, azOff, config)});
    }
    gridEq.push(line.filter(l=> !isNaN(l.x) && !isNaN(l.y) ));
  }

  for(let i =0; i<=360; i+=30){
    const line = [];
    for(let j =-85; j<=85; j+=5){
      line.push({ra: i, dec: j, ...radec2xy(i*d2r, j*d2r, stereo, azOff, config)});
    }
    gridEq.push(line.filter(l=> !isNaN(l.x) && !isNaN(l.y) ));
  }
}

export const calcGridGal = (stereo, azOff, config) =>{
  gridGal = [];
  for(let j =-80; j<=80; j+=40){
    const line = [];
    for(let i =0; i<=360; i+=10){
      line.push({ra: i, dec: j, ...gal2xy(i*d2r, j*d2r, stereo, azOff, config)});
    }
    gridGal.push(line.filter(l=> !isNaN(l.x) && !isNaN(l.y) ));
  }

  for(let i =0; i<=360; i+=30){
    const line = [];
    for(let j =-85; j<=85; j+=5){
      line.push({ra: i, dec: j, ...gal2xy(i*d2r, j*d2r, stereo, azOff, config)});
    }
    gridGal.push(line.filter(l=> !isNaN(l.x) && !isNaN(l.y) ));
  }
}

export const drawGridAz = (svg, color) =>{
    const lines = svg.selectAll('.gridaz');
    const databoundGridAz = lines.data(gridAz);
    databoundGridAz.enter().append('path').attr('class','gridaz');;
    databoundGridAz.exit().remove();
    databoundGridAz
        .attr("d", d=>lineFunction(d))
        .attr("stroke", color)
        .attr("stroke-width", 1)
        .attr("fill", "none");
}

export const drawGridEq = (svg, color) =>{
    const lines = svg.selectAll('.grideq');
    const databoundGridEq = lines.data(gridEq);
    databoundGridEq.enter().append('path').attr('class','grideq');;
    databoundGridEq.exit().remove();
    databoundGridEq
        .attr("d", d=>lineFunction(d))
        .attr("stroke", color)
        .attr("stroke-width", 1)
        .attr("fill", "none");
}

export const drawGridGal = (svg, color) =>{
    const lines = svg.selectAll('.gridgal');
    const databoundGridGal = lines.data(gridGal);
    databoundGridGal.enter().append('path').attr('class','gridgal');;
    databoundGridGal.exit().remove();
    databoundGridGal
        .attr("d", d=>lineFunction(d))
        .attr("stroke", color)
        .attr("stroke-width", 1)
        .attr("fill", "none");
}

export const drawAz = (svg, stereo, azOff, config) =>{
  const az = [
    {l:"N", ...azel2xy(0*d2r, 2*d2r, stereo, azOff, config)},
    {l:"E", ...azel2xy(90*d2r, 2*d2r, stereo, azOff, config)},
    {l:"S", ...azel2xy(180*d2r, 2*d2r, stereo, azOff, config)},
    {l:"W", ...azel2xy(270*d2r, 2*d2r, stereo, azOff, config)}
  ];

  const labels = svg.selectAll('.azLabels');
  const databoundLabels = labels.data(az);
  databoundLabels.enter().append('text').attr('class','azLabels');;
  databoundLabels.exit().remove();
  databoundLabels
    .attr("x", (d) =>{ return d.x; })
    .attr("y", (d) =>{ return d.y; })
    .attr("dx", (d) =>{ return 5; })
    .attr("fill", (d) =>{ return '#888'; })
    .attr("font-size", "1em")
    .attr("font-family", "Arial")
    .attr("font-weight", "bold")
    .text( (d) =>{ return d.l; });
}

const lineFunction = d3.svg.line()
     .x(d =>{ return d.x; })
     .y(d =>{ return d.y; })
     .interpolate("linear");
