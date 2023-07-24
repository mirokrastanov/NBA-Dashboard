# Server code will appear here...

## Node.js backup server in case of Firebase issues or any other unforseen issues
- A Node.js server using Express.js. (As a secondary backup layer in case Firebase is in maintenance etc - TBD on whether such a measure would make it to the release)  
- Firebase as a database for hosting the Users and additional application information (a complete copy of the whole website dynamic data that will be fetched by the app). 
- Some sort of a encryption and hashing techniques would also be employed (TBD).