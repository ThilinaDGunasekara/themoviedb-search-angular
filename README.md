# The Movie Database API search UI
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/mar753/themoviedb-search/master/LICENSE)

This is a user interface for The Movie Database search API written in Angular 4.

## About the project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2. It uses Angular version 4 with Bootstrap ^3.3.7. Unit tests were written using Jasmine and Karma as the test runner, test-driven development (TDD) was used. Project is compatible with the official Angular 2/4 styleguide: https://angular.io/guide/styleguide. Public functions are documented using JSDoc. Besides the main AppModule with app.component.ts and app.component.spec.ts (with unit tests) project was divided into several modules with their own components/services:

- core - module with global services loaded once during application startup in the AppModule (services are singletons thus this module cannot be included anywhere else in the project)
- shared - module with shared components without services, the components placed in here can be reused (included multiple times) within a project
- tmd-search - module with the search feature and user interface
  - config.json - API configuration file (enter your API key here)
  - search-query-parametrs.model.ts - Interface for the tmd-search.service with data structure
  - tmd-search.component.ts - Component which implements user interface for the search
  - tmd-search.component.spec.ts - Unit tests for the component
  - tmd-search.component.html - HTML template for the component
  - tmd-search.component.scss - SCSS/CSS styles for the HTML template
  - tmd.search.service.ts - Service responsible for handling HTTP communication via GET request with a search parameters
  - tmd.search.service.spec.ts - unit tests for the service

## Requirements

Node 6.9.0 or higher is required, together with NPM 3 or higher. To use 'ng' commands Angular CLI must be globally installed via `npm install -g @angular/cli`, otherwise you can use `npm` commands below.

## Installation

After cloning this repo, run `npm install` in the project folder. Then you need to generate your own API key to access https://api.themoviedb.org/3. This key should be pasted in the '%project%/src/app/tmd-search/config.json' file, instead of \<key>. Now you can use `npm` commands:
- `npm start` to serve the app (then navigate to `http://localhost:4200` in the browser)
- `npm test` to run unit tests with Karma
- `npm run e2e` to run e2e tests
- `npm run lint` to run linter
- `npm test -- --code-coverage` to genereate code coverage report

If Angular CLI is installed globally you can use below commands.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
