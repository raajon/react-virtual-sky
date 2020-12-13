import React, {useState} from 'react';
import useWindowDimensions from './hooks/useWindowDimensions.js';
import logo from './logo.svg';
import './App.css';
import VirtualSky from './VirtualSky/VirtualSky.js';
import projectionsConfig from './VirtualSky/projectionsConfig.js';

const App = () =>{
  const [azOff, setAzOff] = useState(270);
  const { height, width } = useWindowDimensions();
  const latitude = 51.746449;
  const longitude = 19.620693;
  // const longitude = 31.746449;
  // const latitude = 19.620693;
  const time = new Date();

  const update = () =>{
    setAzOff(azOff+10);
  }

  const config = projectionsConfig(width, height-50, latitude, longitude, time)

  return (
    <div>
      <VirtualSky id="startmap" config={config} azOff={azOff}/>
      <button onClick={update}>update</button>
    </div>
  );
}

export default App;
