# Fintech Application in React Native

## Introduction

Fintech applications have revolutionized the way we manage our finances by leveraging the power of technology. React Native, a popular cross-platform framework, has emerged as a key tool for developing fintech applications due to its ability to build native-like mobile apps using JavaScript. In this readme, we will explore the various aspects of developing a fintech application using React Native.

## Technology Stack

+ **React Native 9.6.2**
+ **Node.js 19.8.1**
+ **JDK11.0.18**
+ **Android Studio**
+ **Postman (Websocket)**
+ **Firebase**

## Libraries

+ **Redux**
+ **React Navigation**
+ **Axios**
+ **Firebase**
+ **Async Storage**
+ **Splash Screen**
+ **React Native Vector Icon**
+ **Dropdown Picker**
+ **Image Picker**
+ **react-i18next**

## Running

```
npm start

npx react-native run-android
```

## Features and Functionalities

### Welcome Screen
Entrance Screen. Users click the LOG IN button.

<img src="https://github.com/Ewenar/React-Native-Fintech-Mobil-App/assets/93758260/c50b3c98-6a73-4ee3-b76d-a72d0e57d98a" width="350" height="800">

### Log In 
Users enter their id and password. User information is authenticated via local storage. If they have not any account, click the Register button.

<img src="https://github.com/Ewenar/React-Native-Fintech-Mobil-App/assets/93758260/a7edc524-f55d-409f-ba0b-07b8aa978df5" width="350" height="800">

### Sign In
The users enter the requested information. The new user is created when they are saved to local storage.

<img src="https://github.com/Ewenar/React-Native-Fintech-Mobil-App/assets/93758260/3ee9d9ee-ac2e-41f4-974b-85ea963d786f" width="350" height="800">

### Saved Credit Card 
This is the screen where the user cards appear. If you want to create new account, click the New Account button. 

<img src="https://github.com/Ewenar/React-Native-Fintech-Mobil-App/assets/93758260/33e70bb0-987f-46a2-840a-95db4946def9" width="350" height="800">

### Create New Accounts
The users enter the requested bank account information. The new bank account is created to firebase and a random iban is generated.

<img src="https://github.com/Ewenar/React-Native-Fintech-Mobil-App/assets/93758260/4ce87d17-d37f-4d69-b650-54dd27d0e25e" width="350" height="800">

### Dashboard 
This is the screen where the user account appear. When you do exchange operation, last transaction section is updated.

<img src="https://github.com/Ewenar/React-Native-Fintech-Mobil-App/assets/93758260/ccec3dd6-3d1c-4d71-a3f6-407a458f980c" width="350" height="800">

### Profile
This is the screen where the user information appear. You can change theme, language, profile photo.

<img src="https://github.com/Ewenar/React-Native-Fintech-Mobil-App/assets/93758260/7bc7ee67-d463-4ad9-96bb-c7d0fc9c664c" width="350" height="800">

### Currency Exchanger
Users select the currency to be changed after entering the amount of money and currency in their account. First, the amount of money to be exchanged is checked, and then the exchange is performed.

<img src="https://github.com/Ewenar/React-Native-Fintech-Mobil-App/assets/93758260/a6069845-c0bc-462e-bd42-eb7146cfcae2" width="350" height="800">

### Live Stream Currency
Currency units are updated in a time-dependent manner via websocket. User can filter the desired currency unit.

*<img src="https://github.com/Ewenar/React-Native-Fintech-Mobil-App/assets/93758260/afa15476-a916-43cb-927e-4c04b66304d1" width="350" height="800">

## Websocket

The WebSocket API is an advanced technology that makes it possible to open a two-way interactive communication session between the user's browser and a server. With this API, you can send messages to a server and receive event-driven responses without having to poll the server for a reply.

In this application, websocket is used to show live currency data. The program sends an HTTP request to the custom websocket server created when the live exchange page is opened. The determined currencies are updated via websocket.

### Running

```
node server.js
```

### Usage

A user and a stock message are sent. The desired currency units can be written and added to the Stock array.

<img src="https://github.com/Ewenar/React-Native-Fintech-Mobil-App/assets/93758260/aef92b1b-b2a9-4e0b-8341-afc472363f6a" width="800" height="200">

