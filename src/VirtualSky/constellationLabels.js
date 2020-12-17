import {constellationDefinition} from './constellationLines.js';
import {radec2xy} from './projections.js'

const d2r = Math.PI/180;

export const getConstellationLabels = (projection, azOff, config) =>{
  const labels = [];
  constellationDefinition.forEach((constel, i) => {
    const pos = radec2xy(constel[1]*d2r, constel[2]*d2r, projection, azOff, config);
    if(isVisible(pos, config)){
      if(!isPointBad(pos)){
        labels.push({
          name: constel[0],
          ...pos
        })
      }
    }
  });
  return labels;
}

export const drawConstellationLabels = (svg, labels) =>{
      svg.selectAll("rect").data(labels).enter().append("svg:text")
        .attr("x", (d) =>{ return d.x; })
        .attr("y", (d) =>{ return d.y; })
        .attr("fill", "#fee")
        .attr("font-size", ".7em")
        .attr("font-family", "Arial")
        .text( (d) =>{ return d.name; });
}

const isVisible = (p, config) =>{
  return p.x>=0 && p.y>=0 && p.x<=config.width && p.y<=config.height;
};
const isPointBad = (p) =>{
	return typeof p !== "object";
};
