import d3 from 'd3';
import {i18n} from '../i18n/i18n.js';

export const drawCanvas = (id, size) =>{
  d3.select("#" + id).select("svg").remove();
  const svg = d3.select("#" + id).append("svg")
      .attr("width", size)
      .attr("height", size)
      .style("background", "black");
  return svg;
}

export const drawGrid = (svg, size, color) =>{
  console.log(svg)
    const gridAz = [];
    const halfSize = size/2;
    const outerRing = halfSize-10;
    const innerRing = 50;

    const ringData = [
      { cx: halfSize, cy: halfSize, r:outerRing },
      { cx: halfSize, cy: halfSize, r:innerRing }
    ]
    const rings = svg.selectAll('.ring');
      rings.data(ringData)
      .enter().append("circle").attr('class','ring')
      .style("stroke", color || "#F00")
      .attr("r", d=>d.r)
      .attr("cx", d=>d.cx)
      .attr("cy", d=>d.cy);


    for(let i =0; i<=2*Math.PI; i+=Math.PI/6){
      const line = [];
        line.push({
          x: (halfSize + (Math.cos(i) * outerRing)),
          y: (halfSize + (Math.sin(i) * outerRing))
        });
        line.push({
          x: (halfSize + (Math.cos(i) * innerRing)),
          y: (halfSize + (Math.sin(i) * innerRing))
        });
      gridAz.push(line.filter(l=> !isNaN(l.x) && !isNaN(l.y) ));
    }

    const lines = svg.selectAll('.gridaz');
    const databoundGridAz = lines.data(gridAz);
    databoundGridAz.enter().append('path').attr('class','gridaz');
    databoundGridAz.exit().remove();
    databoundGridAz
        .attr("d", d=>lineFunction(d))
        .attr("stroke", color || "#F00")
        .attr("stroke-width", 1)
        .attr("fill", "none");
}

export const drawMark = (svg, rawValue, size, color) =>{
  const halfSize = size/2;
  const outerRing = halfSize-10;
  const deg = rawValue * 2*Math.PI / 12;

  const data = {
    cx: !isNaN(deg) ? (halfSize + (Math.sin(deg) * outerRing)) : -100,
    cy: !isNaN(deg) ? (halfSize + (-Math.cos(deg) * outerRing)) : -100,
    r:10
  }

  const mark = svg.selectAll('.mark');
    mark.data([data])
    .enter().append("circle").attr('class','mark')
    .style("stroke", color || "#F00")
    .style("fill", "black")
    .attr("r", d=>d.r)
    .attr("cx", d=>d.cx)
    .attr("cy", d=>d.cy);
}

export const drawValue = (svg, rv, size, color, lang) =>{
  const translates = i18n(lang|| 'en');
  const value = rv ? Math.floor(rv) + ":" + String(Math.round((rv - Math.floor(rv))*60)).padStart(2, '0') : translates["noGPS"];
  const labels = svg.selectAll('.azLabels');
  const databoundLabels = labels.data([{l:value, x:size/2, y:size/2}]);
  databoundLabels.enter().append('text').attr('class','azLabels');;
  databoundLabels.exit().remove();
  databoundLabels
    .attr("x", (d) =>{ return d.x; })
    .attr("y", (d) =>{ return d.y; })
    .attr("fill", (d) =>{ return color || "#F00"; })
    .attr("font-size", "1em")
    .attr("font-family", "Arial")
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .text( (d) =>{ return d.l; });
}

const lineFunction = d3.svg.line()
     .x(d =>{ return d.x; })
     .y(d =>{ return d.y; })
     .interpolate("linear");
