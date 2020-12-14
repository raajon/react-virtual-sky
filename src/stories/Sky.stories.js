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
  azOff: 200,
  height: 500,
  width: 560,
  latitude: 51.746449,
  longitude: 19.620693,
  time: new Date(2020, 11, 24, 20, 0, 0, 0)
};

export default story;
