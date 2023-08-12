# NBA-Dashboard
🏀📆💻▶️A Fully Responsive Full Stack Web Application offering a modern dashboard with NBA stats, team rosters, leaderboard, upcoming games and more with a detailed page for each.

## App Demo
- The app was deployed using the Firebase Hosting service
- DEMO: [Check it out](https://nba-1-480a7.web.app/)

<br />
<br />

# General App Overview
## Introduction
- The app provides all sorts of NBA information. 
- The user experience is nicely designed and styled with beautiful elements. 
- Both Light and Dark mode are available throughout the whole application pages.
- Mobile devices gain a specifically designed experience tuned for small screen devices.

## Key Features
- Light/Dark modes - selection is remembered
- Favorites/Likes for Logged in Users. Favorites are displayed in the User's Profile.
- Authentication
- Guest features/access are limited
- Users get an enhanced experience and twice as many available features
- Search with auto suggestions (show up as you type) 
- Dynamic navigation with animations and active highlight
- Special mobile device views and navigation show/hide button
- And much more...

## Page Map
- 1. Dashboard (Some elements change depending on guest/user status)
- 2. Standings
    - 1. Western Conference Standings
    - 2. Eastern Conference Standings
- 3. Teams
    - 1. Selected Team Details
        - 1. Team Roster
        - 2. Team Advanced Stats
- 4. Players
    - 1. Selected Player Details
- 5. Transactions (Only for logged in Users)
- 6. News (Only for logged in Users)
    - 1. Current News Article Details (Only for logged in Users)
- 7. Analysis (Only for logged in Users)
    - 1. Current Analysis Article Details (Only for logged in Users)
- 8. User Profile (Only for logged in Users)

## Sneak Peak Images 
- Dashboard (User View)

- Dashboard (Guest View)

- Teams (with nice hover effects)

- Navigation (with a custom animated tooltip on hover)

- Navigation on big screens

- Navigation on mobile devices (toggled on)

- Mobile View with navigation toggled off

- Liked Team (already added to favorites)

- Not liked (you can click on the star to add it to favorites). Also showcases the custom tooltip on hover telling you what happens if you click the star. The star also spins with an animation effect, but to see that you must try out the app. :)


## A lot more awaits you on the app. Thank You! 
### DEMO: [Check it out](https://nba-1-480a7.web.app/)


<br />
<br />

# Technical Information

## Front End side 
### This SPA project was built using the Angular framework
- More information regarding Angular can be found in [this README](https://github.com/mirokrastanov/NBA-Dashboard/blob/main/client/README.md) and in the [Angular Docs](https://docs.angularjs.org/api).


## Back End side
### Back End is fully handled by Firebase
- Read the details of this project's back end handling and challenges. [Here](https://github.com/mirokrastanov/NBA-Dashboard/blob/main/server/README.md)

### NBA Data obtained via web scraping
- The lack of a free and feasible good API led to me learning web scraping and incorporating it for this project.
- It was a great way for me to learn more about the `puppeteer` library and web scraping as a whole.
- This of course made the Front End use of this data harder than using a regular API. 
- There were many challenges and the process was very involved. 
- Read more about it [Here](https://github.com/mirokrastanov/NBA-Dashboard/tree/main/web-scrapers)
