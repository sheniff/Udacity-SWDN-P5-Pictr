# Project 4 : Corporate Dashboard App
## Udacity : Senior Web Developer Nanodegree

### How to run it
`$> npm i` to install all dependencies and libraries via bower (automatically run as postinstall dependency)

`$> npm run serve` command compiles app locally and runs a local server

If you're using Mac OSX or Linux, you can do `open http://localhost:3000` to directly open a browser with the local app or just [go and open it manually by clicking here](http://localhost:3000).

### [Live demo](https://sheniff.github.io/Udacity-SWDN-P4-DashboardApp/)

### Features
* [x] Completion: App includes all requirements, including header, menu, and all dashboard views.
* [x] Responsiveness: Is responsive. Based on Bootstrap and Gentelella for a better looking.
* [x] Component Design: Uses AngularJS as a JS framework to separate data visualization from data itself. Coded in Typescript for the joy of developers and reviewers :D
* [x] Data Formats: All data is fetched externally using AngularJS' `$http` service pointing to fake JSON/CSV endpoints living in an AWS S3 bucket.
* [x] Near Real-Time Updates: Some widgets (like `reported issues` and `paying customers` charts) have been provided with real-time data polling as an example that the app can refresh data automatically without having to refresh the page.
* [x] Build process. It uses Grunt to build the app as requested.

### Libraries and technologies I used
* `Gulp + plugins` (for task automation)
* `AngularJS` with `Typescript`
* `Highcharts + Highmaps` as chart libraries
* `Typings`, to develop with old libraries and typescript
* `SASS`, `Bootstrap-sass` and `Gentelella` for styling
* `Webpack` for next-gen UI generation :)
