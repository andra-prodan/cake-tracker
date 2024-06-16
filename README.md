# Cake Tracker Application

## Overview
The Cake Tracker application is built using .NET for the backend, React for the frontend, and MongoDB for the database. Follow the instructions below to set up and run the project locally.

## Prerequisites
- Visual Studio
- Node.js and npm
- MongoDB

## Getting Started

### Backend (.NET)
1. Open Visual Studio.
2. Navigate to the `server` folder.
3. Build and run the project from Visual Studio.

### Frontend (React)
1. Open a terminal.
2. Navigate to the `client` folder.
3. Run the following commands:
   ```bash
   npm install
   npm run dev
   
### Database (MongoDB)
- Ensure MongoDB is installed and running on your machine.
- Create a database named `cakeTrackerDB`.
- Create a collection named `users`.

#### Dummy Data
- In the GitHub repository, there is a file named `dummyData`.
- Use this file to import dummy data into the `users` collection of the `cakeTrackerDB` database.

### Running the Application
1. Ensure all services are running:
   - .NET backend
   - React frontend
   - MongoDB
2. Open your browser and navigate to [http://localhost:3000/](http://localhost:3000/).

## Application Features

### Navbar
- **Home:** Start page.
- **Users:**
  - Displays all users in a sortable table.
  - Pagination is implemented with 5 users per page.
  - Below the table, there is an "Add User" button.
  - Clicking the "Add User" button opens a form that must be completed to add a new user.
  - The form includes validation:
    - All fields are required.
    - Age must be at least 18 years.
    - Duplicate names or locations are not allowed.
  - The "Add" button submits the form and adds a user.
  - The "Close" button closes the form.
- **Birthdays:**
  - Lists all users sorted by upcoming birthdays.

### Backend Features
- Age validation (minimum 18 years).
- No duplicate entries for name or location.
- Supports sorting and pagination.
