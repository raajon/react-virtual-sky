import React from 'react';
import VirtualSky from '../VirtualSky/VirtualSky.js';

const story = {
  title: 'Example/VirtualSky',
  component: VirtualSky,
  argTypes: {
    azOff: { control: 'number' },
    height: { control: 'number' },
    width: { control: 'number' },
    latitude: { control: 'number' },
    longitude: { control: 'number' },
    time: { control: 'date' },
    starMag: { control: 'number' },
    showPlanets: { control: 'boolean' },
    showPlanetsOrbit: { control: 'boolean' },
    showPlanetsLabels: { control: 'boolean' },
    showSunMoon: { control: 'boolean' },
    showConstellations: { control: 'boolean' },
    showConstellationBoundaries: { control: 'boolean' },
    showConstellationLabels: { control: 'boolean' },
    showAzGrid: { control: 'boolean' },
    showGalaxy: { control: 'boolean' },
    showInfo: { conrtol:'boolean' },
    skyColors: { control: 'array' },
    gridColor: { control:'color'}
  },
};

const Template = (args) =>   {
  const config = {
    azOff: args.azOff,
    height: args.height,
    width: args.width,
    latitude: args.latitude,
    longitude: args.longitude,
    time: new Date(args.time),
    skyColors: args.skyColors,
    gridColor: args.gridColor,
    visibility:{
      starMag : args.starMag,
      showPlanets: args.showPlanets,
      showPlanetsOrbit: args.showPlanetsOrbit,
      showPlanetsLabels: args.showPlanetsLabels,
      showSunMoon: args.showSunMoon,
      showConstellations: args.showConstellations,
      showConstellationBoundaries: args.showConstellationBoundaries,
      showConstellationLabels: args.showConstellationLabels,
      showAzGrid: args.showAzGrid,
      showGalaxy: args.showGalaxy,
      showInfo: args.showInfo
    }
  }
  return <VirtualSky id="startmap" config={config}/>
};

export const Primary = Template.bind({});
Primary.args = {
  azOff: 180,
  height: 500,
  width: 560,
  latitude: 51.7462699,
  longitude: 19.5051337,
  time: new Date(),
  starMag:7,
  showPlanets: true,
  showPlanetsOrbit: true,
  showPlanetsLabels: true,
  showSunMoon: true,
  showConstellations: true,
  showConstellationBoundaries: false,
  showConstellationLabels: true,
  showAzGrid: true,
  showGalaxy: true,
  showInfo: true,
  skyColors: [ "#000", "#100050" ],
  gridColor: "#100050"
};

export const VirtualSkyExample = Template.bind({});
VirtualSkyExample.args = {
  azOff: 180,
  height: 350,
  width: 500,
  latitude: 34.4326,
  longitude: 119.86286000000001,
  time: new Date(),
  starMag:6,
  showPlanets: true,
  showPlanetsOrbit: true,
  showPlanetsLabels: true,
  showSunMoon: true,
  showConstellations: true,
  showConstellationBoundaries: true,
  showConstellationLabels: true,
  showAzGrid: true,
  showGalaxy: true,
  showInfo: true,
  skyColors: [ 'rgb(0,0,0)', 'rgb(20,0,70)' ],
  gridColor: "#100050"
};

export default story;
