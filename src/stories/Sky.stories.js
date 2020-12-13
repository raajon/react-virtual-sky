import React from 'react';
import VirtualSky from '../VirtualSky/VirtualSky.js';
import projectionsConfig from '../VirtualSky/projectionsConfig.js';


export default {
  title: 'Example/VirtualSky',
  component: VirtualSky,
  argTypes: {
    azOff: { control: 'number' },
    height: { control: 'number' },
    width: { control: 'number' },
    latitude: { control: 'number' },
    longitude: { control: 'number' },
    time: { control: 'date' },
  },
};

const Template = (args) =>   {
  const config = projectionsConfig(args.width, args.height, args.latitude, args.longitude, args.time)
  return <VirtualSky id="startmap" config={config} azOff={args.azOff}/>
};

export const Primary = Template.bind({});
Primary.args = {
  azOff: 0,
  height: null,
  width: null,
  latitude: 51.746449,
  longitude: 19.620693,
  time: new Date()
};
