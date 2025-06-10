# 🌦️ WeatherWise – AI-Powered Weather Assistant

**WeatherWise** is a full-stack web application that provides real-time weather information along with smart, AI-generated suggestions based on current conditions. It also stores recent recommendations per user session using MongoDB.

---

## 🚀 Features

- 🔍 **City-based & Location-based weather**
- 🤖 **AI-generated lifestyle & travel tips** based on weather
- 🧠 **Mock fallback mode** (no API cost or quota needed)
- 🧭 Real-time weather via OpenWeatherMap API

---

## 🖥️ Tech Stack

### Frontend
- React.js
- JavaScript, HTML, CSS
- OpenWeatherMap API
- React-Bootstrap or MUI Accordion (optional)

### Backend
- Node.js + Express
- AI: OpenAI / Hugging Face / Mock fallback

---

## 📁 Project Structure

weather-ai-assistant/
├── client/ # React frontend
│ └── src/
├── server/ # Express backend
│ ├── index.js
│ ├── .env
│ └── package.json
├── README.md
└── .gitignore

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites
- Node.js
- npm
- OpenAI key (optional, fallback is supported)

---

### 📦 Installation

####1. clone the repo 
```bash 
git clone https://github.com/sandeepreddy2462/weather-ai-assistant.git
cd weather-ai-assistant

#### 2. Setup Backend
cd server
npm install

Required Backend Packages:
npm install express cors body-parser dotenv axios openai
npm install mongoose express-session connect-mongo


📚 API Reference
POST /generate-suggestions
Receives weather data and returns AI.```

---










# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

