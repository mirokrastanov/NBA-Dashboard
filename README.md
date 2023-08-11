# NBA-Dashboard (Finished! README in progress...)
🏀📆💻▶️A Fully Responsive Full Stack Web Application offering a modern dashboard with NBA stats, team rosters, leaderboard, upcoming games and more with a detailed page for each.


# CLOUD DEMO
## [Check it out](https://nba-1-480a7.web.app/)


# The rest of this document has not been updated yet... Please check tomorrow.


## Front End side 
- Angular SPA - Incorporates an open source API with NBA data and all of Angular's magic.
- Update: The project employs a few CUSTOM BUILT web scrapers (built by me) in order to fetch important additional data, unavailable from the open API source I'll use.
- In addition all of the info will be fetched at preset intervals and stored as a json doc on Firebase to avoid running into forcemajor, issues or maintenance leading to those outside services being unavailable during the project defence.
- (TBD) I'd also like to setup a secondary layer of backup in the form of a custom back end server that will only be used to replace firebase in case their service somehow fails at the day of the defence too. But that is still not certain as there are many tasks still on the dev track for me.

## Back End side 
- A Node.js server using Express.js. (As a secondary backup layer in case Firebase is in maintenance etc - TBD on whether such a measure would make it to the release date)  
- Firebase as a database for hosting the Users and additional application information (a complete copy of the whole dynamic data that will be fetched by the app). 
- Some sort of a encryption and hashing techniques would also be employed (TBD).



<!-- 
# NBADashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page. -->
