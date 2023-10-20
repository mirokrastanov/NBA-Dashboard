# All NBA data is provided by these web scrapers. 
- Only one part of NBA teams comes from a real API, but following the centralized approach it is fetched and also saved on firebase along the rest of the data. 
- All scrapers employ some degree of filtering, sorting, mapping and more to the data, before preparing the final format to be saved to firebase.

## Data scraped
- NBA Players roster from the current season (under a valid contract at the moment of getting the data)
- NBA Teams - General data + mains stats, advanced stats, current team roster and team logos (part of the team data comes from a real API and is saved to firebase as this API is free, not perfect and often under maintenance)
- NBA Standings from the current season (during midseason - it refers to the last one)
- NBA News (public) with ref links
- NBA Analysis from specialists (public) with ref links
- NBA Advanced stats
- NBA Season Leaders top5 charts 

## Technical information
- Main tool for the web scraping performed is the `Puppeteer` library.
- Supporting that the `Firebase database` library was used to help with saving to db.
- And lastly for the small piece of API fetched info - `Axios` came in to help with this task.

## Challenges 
- The use of scraped information due to the lack of a free fit for the purpose API has made this task much harder due to many factors.
- Main issue was the lack of consistent identifiers, which made the finding, filtering, sorting and mapping post-scrape operations very complex. 
- Furthermore, partial fetching using search or query parameters was not possible with firebase as it is. Therefore some clever solutions needed to be implemented and used in the process of building the SPA with Angular.
- Read more about those challenges and how they were solved on the main README.md of the whole project. [Here](https://github.com/mirokrastanov/NBA-Dashboard)

## ALL INFORMATION SCRAPED IS PUBLIC and it was used solely for this student project! 
### Sources
- [Basketball.realgm.com](https://basketball.realgm.com/)
- [NBA.com](https://www.nba.com/)

### API (only used for teams general data)
- [Balldontlie.io](https://www.balldontlie.io/home.html#introduction)
