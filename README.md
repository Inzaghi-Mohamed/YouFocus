# YouFocus (PLMS: Personal Learning Management System)

![Alt text](./public/images/YouFocusLogo.png)

You can the App at: https://youfocus.techscripted.info




## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Application Views](#application-views)
- [Supported Browsers](#supported-browsers)
- [APIs](#apis)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Future Goals](#future-goals)

## Overview

YouFocus is a Personal Learning Management System (PLMS) designed to help users stay focused and productive when learning from YouTube.
Created by Abdirizak Mohamed, this application allows users to create courses, search for relevant YouTube videos within the app, and manage their learning process effectively.

**Version:** 0.1
**Release Date:** 11/08/2024

## Features

- User authentication (Sign up and Login)
- Course creation and management
- Focused YouTube video search within created courses
- Note-taking functionality for each course
- Selected video management
- Distraction-free learning environment

## Application Views

### 1. Landing Page / User Authentication
- Sign up and Login options
- App name and slogan display
- About page link

### 2. Login Page
- User credential input
- Authentication process
- Redirection to homepage upon successful login

### 3. Homepage
- Course creation and management
- Dynamic course card display
- Edit, search, and delete functionality for courses

### 4. Note-Taking View
- Course-specific note display
- Note editing and deletion options

### 5. YouTube Search View
- Course-specific video search
- Display of search results (10 videos)
- Option to add videos to courses

### 6. Selected Videos View
- Display of selected videos categorized by course
- Option to remove videos from the selection




## Supported Browsers

| Browser Name | Version |
|--------------|---------|
| Chrome       | 129     |

## APIs

- YouTube API
  - Endpoint: GET https://www.googleapis.com/youtube/v3/search

## Technologies

- Node.js
- Express
- React
- Redux
- Sagas
- PostgreSQL
- Passport
- YouTube API
- Tailwind CSS
- Shadcn UI
- Heroku

## Getting Started
To set up and run the project locally, follow these steps:

Clone the repository to your local machine.
Navigate to the project directory.
Install the dependencies and start the client and server:
## Installation

To install the project dependencies, run the following command:

```bash
npm install

```

To run the Client:
```bash
npm run client

```

To run the Server:
```bash
npm run server



---

For more information or to contribute to this project, please contact Abdirizak Mohamed.

