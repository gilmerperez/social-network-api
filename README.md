# Social Network API

## Project Overview

The Social Network API is a backend application built using Node.js, Express, and MongoDB with Mongoose ODM. It provides a RESTful API that allows users to create and manage their social media profiles, thoughts, and interactions with friends. The project aims to simulate the backend functionality of a social networking platform where users can post thoughts, react to others' thoughts, and maintain a list of friends.

This project was developed to demonstrate the implementation of MongoDB as a NoSQL database solution and to practice creating RESTful API endpoints using Express.js. The API follows proper data relationships through Mongoose schemas, including virtuals to compute derived data such as friend counts and reaction counts dynamically. Testing of all endpoints is performed using Insomnia, as there is no frontend interface.

## Table of Contents

- [Usage](#usage)
- [Mock Up](#mock-up)
- [Instructions](#instructions)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Additional Resources](#additional-resources)

## Usage

To start the application, run the following command in your terminal:

### 1. Install dependencies
```bash
npm install
```

### 2. Start the server:
```bash
npm start
```

## Mock Up

The following animations show examples of the application's API routes being tested in Insomnia:

The following animation shows GET routes to return all users and all thoughts being tested in Insomnia:
![Demo of GET routes to return all users and all thoughts being tested in Insomnia.](./assets/18-nosql-homework-demo-01.gif)

The following animation shows GET routes to return a single user and a single thought being tested in Insomnia:
![Demo that shows GET routes to return a single user and a single thought being tested in Insomnia.](./assets/18-nosql-homework-demo-02.gif)

The following animation shows the POST, PUT, and DELETE routes for users being tested in Insomnia:
![Demo that shows the POST, PUT, and DELETE routes for users being tested in Insomnia.](./assets/18-nosql-homework-demo-03.gif)

In addition to this, your walkthrough video should show the POST, PUT, and DELETE routes for thoughts being tested in Insomnia.

The following animation shows the POST and DELETE routes for a user’s friend list being tested in Insomnia:
![Demo that shows the POST and DELETE routes for a user’s friend list being tested in Insomnia.](./assets/18-nosql-homework-demo-04.gif)

In addition to this, your walkthrough video should show the POST and DELETE routes for reactions to thoughts being tested in Insomnia.

## Instructions

### 1. Clone the repository
```bash
git clone https://github.com/gilmerperez/social-network-api.git
```

### 2. Navigate to the project folder
```bash
cd social-network-api
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start the MongoDB server locally or use a cloud database

### 5. Run the application
```bash
npm run start
```

### 6. Use Insomnia or Postman to test API routes

## Key Features

* **Friend System:** Add or remove friends from a user’s profile.
* **Thoughts:** Users can post, update, and delete their thoughts.
* **Users:** Create, update, delete users, and track their friends list.
* **Reactions:** Users can react to thoughts, enhancing interactivity.
* **Virtuals:** Friend count and reaction count are computed dynamically.
* **MongoDB & Mongoose:** Utilizes NoSQL database with Mongoose models and schema validation.

## Technology Stack

This project relies on the following tools and technologies:
* **Node.js:** Server runtime environment.
* **Express.js:** Handles API routing and middleware.
* **Mongoose:** ODM to manage MongoDB interactions.
* **MongoDB:** NoSQL database for flexible data storage.
* **Nodemon:** Development tool for automatic server restart.
* **Insomnia/Postman:** API testing tool to verify functionality.

## Additional Resources

Express.js Documentation: [Express.js Docs](https://expressjs.com/)

MongoDB Documentation: [MongoDB Docs](https://www.mongodb.com/docs/)
