export const drawInfo = (svg, config, rendTime) =>{
    const info=[
      {x:10, y:10, content:config.astronomicalTimes.clock},
      {x:10, y:20, content:config.latitude.deg + " " + config.longitude.deg},
      {x:10, y:30, content:rendTime},
    ]
    const labelsSvg = svg.selectAll('.info');
    const databoundLabels = labelsSvg.data(info);
    databoundLabels.enter().append('text').attr('class','info');;
    databoundLabels.exit().remove();
    databoundLabels
      .attr("x", (d) =>{ return d.x; })
      .attr("y", (d) =>{ return d.y; })
      .attr("fill", "#fef")
      .attr("font-size", ".7em")
      .attr("font-family", "Arial")
      .text( (d) =>{ return d.content; });
}
