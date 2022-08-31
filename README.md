# Project and Portfolio 3

## Project Overview

This project will use Spotify Web API to integrate into a website that will allow a user to login, search and pull music data which will be displayed. 

### Prerequisites

- NodeJS
- npm
- Chrome 
- Express
- ReactJS
- Spotify Web Api

### How to get started

Make sure a .env file was created and put the environment variables inside. 
You will need to setup a spotify developer account and create an app in the Spotify developer dashboard first.
From there collect your Client ID and Client Secret and store them in a .env file please make sure it is not a public folder.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Links
The necessary links that will be used (to be updated as project develops)
- http://localhost:3000 - The main location of the user interface
- https://accounts.spotify.com/authorize - Spotify authorization endpoint for login 
- https://api.spotify.com/v1/me - Required for accessing current users profile.
- https://api.spotify.com/v1/me/playlists - Reguired for accessing current users playlists.
- https://api.spotify.com/v1/playlists/playlist_id/images - Required for getting playlist cover image.
