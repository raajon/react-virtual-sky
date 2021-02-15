import {constellationDefinition} from './constellationLines.js';
import {radec2xy} from './projections.js'
import {i18n} from './i18n.js';

const d2r = Math.PI/180;
let labels = [];

export const calcConstellationLabels = (projection, azOff, config) =>{
  const lang = config.language || 'en';
  const translates = i18n(lang);
  labels = [];
  constellationDefinition.forEach((constel, i) => {
    const pos = radec2xy(constel[1]*d2r, constel[2]*d2r, projection, azOff, config);
    if(isVisible(pos.el)){
      if(!isPointBad(pos)){
        labels.push({
          name: translates.constellations[constel[0]] || constel[0],
          ...pos
        })
      }
    }
  });
}

export const drawConstellationLabels = (svg) =>{
      const labelsSvg = svg.selectAll('.constellationLabels');
      const databoundLabels = labelsSvg.data(labels);
      databoundLabels.enter().append('text').attr('class','constellationLabels');;
      databoundLabels.exit().remove();
      databoundLabels
        .attr("x", (d) =>{ return d.x; })
        .attr("y", (d) =>{ return d.y; })
        .attr("fill", "#fee")
        .attr("font-size", ".7em")
        .attr("font-family", "Arial")
        .text( (d) =>{ return d.name; });
}

const isVisible = (el) =>{
  return el>0;
};
const isPointBad = (p) =>{
	return typeof p !== "object";
};
