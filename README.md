# React VirtualSky

[![Build Status](https://travis-ci.org/raajon/react-virtual-sky.svg?branch=master)](https://travis-ci.org/raajon/react-virtual-sky)
[![npm version](https://badge.fury.io/js/react-virtual-sky.svg)](https://badge.fury.io/js/react-virtual-sky)


Its react version of [VirtualSky](https://github.com/slowe/VirtualSky).

#### Basic Demo
[![Edit react-trello-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-virtual-sky-fbteb)

## Getting Started

Install using npm or npm

```bash
$ npm install --save react-virtual-sky
```

or

```bash
$ npm add react-virtual-sky
```

## Usage

```jsx
export default class App extends React.Component {

  const config={
    azOff: 0,
    height: 500,
    width: 500,
    latitude: 51.746449,
    longitude: 19.620693,
    time: new Date(),
    skyColors: [ "#000", "#100050" ],
    gridAzColor: "#100050",
    gridEqColor: "#105000",
    gridGalColor: "#500020",
    language: 'en',
    visibility:{
      starMag: 6,
      showStarLabels: false,
      showPlanets: true,
      showPlanetsOrbit: true,
      showPlanetsLabels: false,
      showSunMoon: true,
      showConstellations: true,
      showConstellationBoundaries: false,
      showConstellationLabels: false,
      showAzLabels: true,
      showAzGrid: true,
      showEqGrid: true,
      showGalGrid: false,
      showGalaxy: true,
      showInfo: true
    }
  }

  render() {
    return <VirtualSky id="startmap" config={config}/>
  }
}
```

## Available languages
  * ar - العربية
  * cs - Čeština
  * de - Deutsch
  * en - English
  * es - Español
  * fr - Français
  * gl - Galego
  * it - Italiano
  * nl - Nederlands
  * pl - Polski
  * pt - Português

## Development

```
npm install
npm run storybook
```

### Scripts

1.  `npm run lint` : Lint all js files
2.  `npm run lintfix` : fix linting errors of all js files
3.  `npm run semantic-release` : make a release. Leave it for CI to do.
4.  `npm run storybook`: Start developing by using storybook
5.  `npm run test` : Run tests. tests file should be written as `*.test.js` and using ES2015
6.  `npm run test:watch` : Watch tests while writing
7.  `npm run test:cover` : Show coverage report of your tests
8.  `npm run test:report` : Report test coverage to codecov.io. Leave this for CI
9.  `npm run build`: transpile all ES6 component files into ES5(commonjs) and put it in `dist` directory
10. `npm run docs`: create static build of storybook in `docs` directory that can be used for github pages

Learn how to write stories [here](https://storybook.js.org/basics/writing-stories/)
