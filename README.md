# DiscBook

[DiscBook](https://discbook.netlify.com)(click the link to see it) was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is deployed on Netlify.

## What is DiscBook about?

This is an app created for CD lovers and collectors. Through this app you can have access to your CD collection from anywhere internet access is possible. So no more wondering if a CD you found in a store is already part of your collection. Furthermore, DiscBook let you share your CDs with others, so you are also able to compare your collection to that of others. This is useful because in this way you can find CDs you don't have in your own collection, or check if a CD of yours is actually rare or not. We definitely invite you to sign up and try it out.

## What does it look like?

There is no better description than experiencing it yourself. So take a look --> [Discbook](https://discbook.netlify.com).

## Functionalities and Technologies

The functionalities that this app relies on are:

- searching for all available cds using [Axios](https://www.npmjs.com/package/axios) (through the API of [discogs](https://www.discogs.com)
- sending emails to cd owners of another user is interested in those cds
- the previous function is only available if the owner chooses to sell the CD
- adding and deleting CDs from a collection
- creating a profile with a picture by using [Cloudinary](https://cloudinary.com)
- testing the cd actions if the right information is fetched with [JEST](https://jestjs.io/)
- showing information on screen with the support of a [Redux](https://redux.js.org/) store and the the [backend](https://github.com/Jannis-Passalis/DiscBook-Server) part of this project

### Technologies (Languages and Tools):

<img src="https://seeklogo.com/images/R/react-logo-7B3CE81517-seeklogo.com.png" alt="react-icon" height="45"/> <img src="https://seeklogo.com/images/R/redux-logo-9CA6836C12-seeklogo.com.png" alt="redux-icon" height="45"/> <img src="https://jestjs.io/img/jest.png" alt="jest-icon" height="45"/> <img src="https://seeklogo.com/images/C/cloudinary-logo-91D46BA298-seeklogo.com.png" alt="cloudinary-icon" height="45" /> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" alt="javascript-icon" height="45" /> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png" alt="css-icon" height="45" /> <img src="https://www.pikpng.com/pngl/m/430-4309640_js-logo-nodejs-logo-clipart.png" alt="nodejs-icon" height="45" /> <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" alt="vs code-icon" height="45" />

## Wireframes

<img src="wireframePictures/ScreenshotSignUp.png" alt="signup" height="270"/><img src="wireframePictures/ScreenshotMyDiscbook.png" alt="mydiscbook" height="270"/><img src="wireframePictures/ScreenshotDiscBookLogin.png" alt="login" height="270"/><img src="wireframePictures/ScreenshotCDs.png" alt="cds" height="270"/><img src="wireframePictures/ScreenshotWelcome.png" alt="welcome" height="270"/><img src="wireframePictures/ScreenshotDiscbookAbout.png" alt="about" height="270"/><img src="wireframePictures/ScreenshotSearchNewCD.png" alt="newcdsearch" height="270"/>

## Datamodel

[Discbook datamodel](https://dbdiagram.io/d/5fbba0563a78976d7b7d0aea)

## Taskboard

[Discbook taskboard](https://github.com/users/Jannis-Passalis/projects/1)

## Learning Goals

- Creating a website from scratch
- Styling with Bootstrap
- Sending emails with Nodemailer
- Uploading pictures with cloudinary
- Connecting to an API that needs consumer and secret key
- Deploying to Heroku
- Creating ReadMe for project
- Using a Taskboard
- Using development and feature branches and not only master branch

## Installation Guide

- Install all dependencies

```
npm install
```

- Run the app

```
npm run start
```
