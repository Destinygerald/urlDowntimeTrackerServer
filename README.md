# URL Downtime tracker

This is the backend server for Url Downtime tracker. This provides users with information about the downtime of a url

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The **URL Downtime Tracker** is an Express-js-based application that powers the user interface for the LMS. It integrates with a frontend to provide features like:

- **Authentication**: User registration, login, and session management.
- **Url Downtimes**: Students can browse, enroll, and participate in courses.
- **Cron Scheduler**: Real-time updates on progress for both students and instructors.


## Features
- **User Authentication**: Secure user login and registration with Google Passport Js and JWT authentication.
- **Watch Url**: Add url to a users watch list for regular check for downtime.

## Technologies Used
- **Express.js** - Node js Library used for building the server.
- **JWT** - JSON Web Tokens for user authentication.
- **Axios** - HTTP client for making API requests.
- **Node Cron** - For Scheduling the regular checks.

## Installation

To get started with this project, follow the steps below:
1. **Clone the repository**:

   ```bash
   git clone https://github.com/TheProgrammingLab/Programming-Lab-Frontend.git


2. **Navigate to the project directory:**
    ```bash
    cd 

3. Install the dependencies:
    ```bash
    npm install

or if you're using yarn
    ```bash
    yarn add

4. Getting Started
To run the project locally in development mode:
    ```bash
    npm run dev

## Project Structure
### Here’s a breakdown of the project's directory structure:
    ```
    /utils                    - Utility functions and API helpers
    /routes                   - Routes for the functions in the server
    /controllers              - Context providers for global state management (if using Context API)
    /middleware.js            - Provides middleware functions like route authentication and async wrapper
    /package.json             - Project metadata and dependencies