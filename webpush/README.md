# Webpush

Sample project demonstrating the integration of Localytics web-sdk to use the web push api.

## Setup

### Replace `YOUR_LOCALYTICS_APP_KEY` with your Localytics app key, one in **public/index.html**, one in **public/worker.js**.

### Replace `YOUR_VAPID_PUBLIC_KEY_AS_DEFINED_IN_LOCALYTICS_DASHBOARD`, in **public/index.html** with the public key of your certificate, found at: 

> settings > apps > click on the cog for your app > add certs > the public key.

## Running Code

In the project directory, you can run:

`npm install`

then

`npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

> replace `import App from './BasicApp';` with `import App from './AdvancedApp';` in **src/index.js** for the more advanced soft ask use case.

_This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)._
