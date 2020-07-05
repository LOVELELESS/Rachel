# Rachel, the E-Receptionist!

> A full-stack mobile app that helps businesses to streamline and simplify the process of setting up meetings with external parties and verifying visitors to their offices. It basically functions as an E-Receptionist!

## Table of contents

- [General info](#general-info)
- [Download App](#download-app)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Contact](#contact)

## General info

This project was actually motivated by my previous internship experience. There was a client that enquired about the possibility of having an E-Receptionist app that replaces the need of having a physical receptionist. They found out that there was a significant time cost in handling visitors to their office, especially at the verification stage. This means that an employee needs to find out from the visitor their purpose of visit as well as the specific employee(s) that they are meeting with. With 1 year of undergraduate computer science education under my belt, I have decided to put my skills to use and develop a E-Receptionist app that may potentially benefit others.

## Download App

[Android APK](./release/app-universal-release.apk.zip)

Since I do not have an Apple Developer Account, I am unable to publish to the App Store. I have tested and the app is working on IOS devices.

## Screenshots

![Example screenshot](./img/screenshot.png)

## Technologies

- Typescript
- React Native
- NodeJS
- ExpressJS
- MongoDB + Mongoose ORM
- Mailgun
- Firebase (Admin SDK, Authentication and Cloud Messenging)

## Setup

1. Clone this repo
2. In project root, run: `npm ci`
3. To start the dev server, run: `npm run dev`
4. To connect to MongoDB successfully, refer to https://docs.atlas.mongodb.com/getting-started/
5. Follow Mailgun setup instructions at https://documentation.mailgun.com/en/latest/user_manual.html#
6. Next, navigate to the client directory by typing: `cd rachel_client`
7. In the client directory root, run `npm ci`
8. There may be other dependencies that have to installed for React Native local dev. Refer to https://reactnative.dev/
9. After the prerequisite installations, run `npx react-native run-ios` to test on IOS or `npx react-native run-android` to test on android. (note that if you are running on android and using local server, you must also run `adb reverse tcp:3000 tcp:3000`)
10. For Google / Facebook authentication and Push-Notifications to work, refer to https://rnfirebase.io/

## Features

- Create, read, update and delete Meetings.
- Uses native date-time picker.
- Create, read, update user roles.
- Send confirmation email with QR code to meeting participants when a new meeting is set up.
- Scan meeting QR code to verify visitor.
- Manual form submission (indicating their contact details and their purpose of visit) for visitors without QR code.
- Push-Notification to employees with _FALLBACK_ / _ADMIN_ role notifying them of new visitor without QR code.
- Employees may _ACCEPT_ / _REJECT_ visitors along with a custom message that will be rendered to the visitor.

Nice to have features:

- Push-Notification to the relevant employee when new visitor with meeting QR code is verified.
- Admin to be able to set custom configs such as standard ACCEPT / REJECT messages as part of their company's Standard Operating Procedures.
- More naunced status update for visitors without meeting QR code such as `WAIT_FOR_X_MINS`.

## Contact

Created by [@raysonkoh](https://www.raysonkoh.com/) - feel free to contact me!
