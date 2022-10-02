import React from 'react';
import PolarAligment from '../PolarAligment/PolarAligment.js';

const story = {
  title: 'Example/PolarAligment',
  component: PolarAligment,
  argTypes: {
    size: { control: 'number' },
    latitude: { control: 'number' },
    longitude: { control: 'number' },
    color: { control:'color' },
    language: { control:{type: 'select', options: [ 'ar', 'cs', 'de', 'en', 'es', 'fr', 'gl', 'it', 'nl', 'pl', 'pt' ]} },
  },
};

const Template = (args) =>   {
  const config = {
    size: args.size,
    latitude: args.latitude,
    longitude: args.longitude,
    color: args.color,
    language: args.language
  }
  return <PolarAligment id="polaraligment" config={config}/>
};

export const Primary = Template.bind({});
Primary.args = {
  size: 300,
  latitude: 51.7462699,
  longitude: 19.5051337,
  color: "#FFF",
  language: 'en'
};

export const NoValue = Template.bind({});
NoValue.args = {
  size: 300,
  latitude: null,
  longitude: null,
  color: "#FFF",
  language: 'en'
};


export default story;
