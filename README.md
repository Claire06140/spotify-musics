# Website to retrieve and display data from your Spotify's saved tracks
## Local - development
`npm install`

.env in src/backend/functions and .env in root both need to contain
```
SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET
LOCAL_URL
PRODUCTION_URL
LOCAL_BACKEND_URL
PRODUCTION_BACKEND_URL
```

Development mode works with 
Port 3000 for Express server
```javascript
// Start server
cd src/backend/functions
// Specify development mode to log PORT and frondend + server urls
NODE_ENV=development node server.mjs
```
Port 5173 on localhost
`npm start`

Go to localhost:5173

## Remote - Production mode works with firebase cloud functions and firebase hosting
Needs Google Developer account and Google Billing acocunt associated with Firebase Spark plan for project
Create firebase project in firebase console
Add hosting and functions
`firebase init`
`// follow init process with existing or new firebase project`
`// Paste firebase config data in ./firebase.config.js`

You might need to add a user allUsers member for Cloud Functions in Google IAM

Then launch hosting and deploy "api" function
`firebase deploy --only functions`
`firebase deploy --only hosting`
OR deploy all at once
`firebase deploy`

Go to the url associated with hosting - Shown in console after --only hosting or all-at-once deploy

Cheers! 🎯
