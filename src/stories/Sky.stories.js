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
    time: { control: 'date' }
  },
};

const Template = (args) =>   {
  const config = {
    azOff: args.azOff,
    height: args.height,
    width: args.width,
    latitude: args.latitude,
    longitude: args.longitude,
    time: new Date(args.time)
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
  time: new Date()
};

export const VirtualSkyExample = Template.bind({});
VirtualSkyExample.args = {
  azOff: 180,
  height: 350,
  width: 500,
  latitude: 34.4326,
  longitude: 119.86286000000001,
  time: new Date()
};

export default story;
