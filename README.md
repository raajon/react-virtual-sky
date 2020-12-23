# React VirtualSky

[![Build Status](https://travis-ci.org/raajon/react-virtual-sky.svg?branch=master)](https://travis-ci.org/raajon/react-virtual-sky)
[![npm version](https://badge.fury.io/js/react-virtual-sky.svg)](https://badge.fury.io/js/react-virtual-sky)


Its react version of [VirtualSky](https://github.com/slowe/VirtualSky).


## Usage

<!-- ```jsx
export default class App extends React.Component {

  const config={
    azOff: 0,
    height: 500,
    width: 500,
    latitude: 51.746449,
    longitude: 19.620693,
    time: new Date(),
    starMag: 6,
    showPlanets: true,
    showPlanetsOrbit: true,
    showPlanetsLabels: true,
    showSunMoon: true,
    showConstellations: true,
    showConstellationBoundaries: true,
    showConstellationLabels: true,
    showAzGrid: true,
    showGalaxy: true
  }

  render() {
    return <VirtualSky id="startmap" config={config}/>
  }
}
``` -->

<iframe src="https://codesandbox.io/embed/cranky-firefly-fbteb?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="cranky-firefly-fbteb"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Development

```
yarn install
yarn run storybook
```

### Scripts

1.  `yarn run lint` : Lint all js files
2.  `yarn run lintfix` : fix linting errors of all js files
3.  `yarn run semantic-release` : make a release. Leave it for CI to do.
4.  `yarn run storybook`: Start developing by using storybook
5.  `yarn run test` : Run tests. tests file should be written as `*.test.js` and using ES2015
6.  `yarn run test:watch` : Watch tests while writing
7.  `yarn run test:cover` : Show coverage report of your tests
8.  `yarn run test:report` : Report test coverage to codecov.io. Leave this for CI
9.  `yarn run build`: transpile all ES6 component files into ES5(commonjs) and put it in `dist` directory
10. `yarn run docs`: create static build of storybook in `docs` directory that can be used for github pages

Learn how to write stories [here](https://storybook.js.org/basics/writing-stories/)
