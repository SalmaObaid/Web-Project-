# Takhmenah Game

## Overview
This project is a web-based Takhmenah game built using Node.js, Express, EJS, and MongoDB. The goal is to allow users to guess a five-letter word within a limited number of attempts. The game provides feedback on letter positions to help users make better guesses.

## Flowchart
1. **Start**
2. **Initialize Game**
   - Set the target word (5-letter word).
   - Set the number of attempts (e.g., 6 attempts).
3. **Get User Input**
   - Input guess (5-letter word).
4. **Check Guess**
   - Is the guess 5 letters long?
     - **No:** Show error message ("Guess must be 5 letters").
     - **Yes:** Proceed.
5. **Compare Guess to Target Word**
   - For each letter in the guess:
     - Correct letter, correct position.
     - Correct letter, wrong position.
     - Incorrect letter.
6. **Display Feedback**
   - Show feedback for the location of letters.
7. **Check for Win or Lose**
   - **Is the guess correct?**
     - **Yes:** Display "You Win!" and end game.
     - **No:** Proceed to next step.
   - **Have the user used all attempts?**
     - **Yes:** Display "You Lose!" and end game.
     - **No:** Go back to step 3 (Get User Input).
8. **End Game**

## Setup Instructions
### Prerequisites
- Node.js installed
- MongoDB installed and running

### Installation Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/SalmaObaid/Web-Project-.git
   cd Web-Project-
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure environment variables:
   ```sh
   MONGO_URI=mongodb://localhost:27017/db
   PORT=3000
   MONGODB_URI=mongodb+srv://username:password@cluster0.aukkz.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   GOOGLE_CALLBACK_URL=http://localhost:3000/google/callback
   GENERATE_TOKEN_KEY=
   ```
4. Start the server:
   ```sh
   node app.js
   ```
5. Open the game in your browser at `http://localhost:3000`.

## Technologies Used
- **Backend:** Node.js, Express.js
- **Frontend:** EJS (Embedded JavaScript Templates), CSS
- **Database:** MongoDB
- **Other:** Mongoose, dotenv

|Node.js - Express.js Code | MongoDB Dashboard|
|---------|---------|
![Game Screenshot](/public/img/code.jpg)|![Game Screenshot](/public/img/mongoDB.jpg)

## Goals
- Create an interactive and engaging word puzzle game.
- Improve user vocabulary and logical thinking skills.
- Provide an intuitive and user-friendly interface.

## API Documentaion [Download](./public/game.postman_collection.json)
**submit-score** API|**get-words** API
|---------|---------|
![Game Screenshot](/public/img/api1.png)|![Game Screenshot](/public/img/api2.png)

## Screenshots

![Game Screenshot](/public/img/screen1.jpg)|![Game Screenshot](/public/img/screen2.jpg)
|---------|---------|
![Game Screenshot](/public/img/screen3.jpg)|![Game Screenshot](/public/img/screen4.jpg)
|---------|---------|
![Game Screenshot](/public/img/screen5.jpg)|![Game Screenshot](/public/img/screen6.jpg)


## Future Work
- Add a multiplayer mode.
- Include different difficulty levels.
- Enhance UI/UX with animations.
- add colored feedback to the boxes

| Attempt | Guess   | Feedback (Colored)  |
|---------|---------|-----------|
| 1       | TRIED   | 🟩⬜⬜⬜⬜ |
| 2       | HOUSE   | 🟨🟨🟨⬜⬜ |
| 3       | DREAM   | 🟨⬜🟨⬜⬜ |
| 4       | GRAPE   | 🟨🟨⬜⬜🟨 |
| 5       | BRAIN   | 🟨🟨🟨⬜⬜ |
| 6       | STORM   | 🟩🟩🟩🟩🟩 |

## Resources
- [Wordle Game Rules](https://www.nytimes.com/games/wordle/index.html)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)

## Team Members
- Dana Alsobay
- Ghaida Aljumah
- Khawlah Alhumaim
- Salma Alharbi
