# Back End is handled entirely by Firebase

## Employed services & features of Firebase
- Realtime Database
- Hosting
- Authentication

## Summary of operations
- The app communicates with the DB and performs CRUD operations - GET, POST, PUT, DELETE.
- Firebase methods such as set, get, update, remove are also used in specific cases.
- The database is updated via web scraping scripts written entirely by myself. At the moment for the purposes of this project (educational, skills showcase) this data scraping and saving to the database is done manually by running a master script also created by me, which handles all of the separate scrapers. The scraping is done with the help of the puppeteer library. 
- Firebase also sends verification emails and confirms verifications status of users.
- Recover password functionality has also been implemented for the project.
- Custom features such as a display name (username) and a photo url have also been included.
- The database returns a json file which is read, filtered, mapped, etc on the Front end side of the application and then it is displayed to the user.
