# CardMates
## Overview  
CardMates is an AI-powered flashcard and quizzing web app designed to optimize the learning process. Users can create, organize, and manage flashcards by subjects or groups. AI automates keyword extraction, enhances flashcard wording, and generates multiple question types (multiple-choice, true/false, matching, short response). Users can customize quizzes by setting the number of questions and difficulty levels, and the app is fully responsive for use on all devices (desktops, tablets, phones).

## Key Features
Flashcard Management: Create, edit, and delete flashcards organized into decks.  
AI-Enhanced Flashcards: AI searches for relevant study materials.  
Quiz Generation: Generate quizzes (multiple-choice, true/false, matching, short-response) based on flashcard decks.  
Difficulty Settings: Customize quizzes by specifying difficulty (easy, medium, hard) with predefined question distribution.  

## Tech Stack  
Frontend: React.js  
Backend: Node.js (with Express.js)  
AI Integration: OpenAI API (for keyword extraction, quiz generation, and resource lookup)  
Database: MongoDB  
Hosting: AWS or Heroku  
Version Control: GitHub  

## Planned MVP Features  
Flashcard Creation & Management: Group and organize flashcards.
AI Assistance: Keyword extraction and flashcard enhancement.
Customizable Difficulty: Create quizzes with varied difficulty settings.

## Reach Goals  
Spaced Repetition: AI-based learning schedules for better retention.  
Progress Tracking: Analytics and performance insights.  
Collaborative Study: Share flashcards and quizzes with others.  
Advanced AI: Improved language processing for more accurate question generation.  

## Team  
Frontend: Nina and Ella - React UI and responsiveness.  
Backend: Luis and Calvin - Java backend and database.  
API Integration: Ibrahim - OpenAI API for AI-powered features and user authentication.  
Testing & Deployment: All team members - QA, deployment on AWS/Heroku.  

## How to run/setup the project  

Follow these steps to set up and run the project: 
### 1. Clone the Repository Clone the repo using either the HTML or SSH link: 
```bash git clone <repository-url> ``` 

### 2. Check for Nodemon Installation Verify if **Nodemon** is installed globally: 
```bash npm list -g nodemon ``` 
- If Nodemon is installed, you'll see its version. If not, you'll see an empty result or an error.

### 3. Install Nodemon If Nodemon is not installed, you can install it globally by running: 
```bash npm install -g nodemon ``` 

### 4. Navigate to the Backend Directory Change into the cloned repository's Backend directory: 
```bash cd Backend ``` 

### 5. Start the Server To start the server, run: 
```bash npm run dev ``` 

### 6. Access the Application Open your web browser (Safari or Chrome) and navigate to: 
``` http://localhost:4000/ ```


### Updating your main branch without overwriting your local

git fetch origin (fetching the latest updates from the remote repository)
git status (make sure it says: On branch main)
git switch main (switches to the main branch, which you should already be on)
git pull origin main (Update the local main branch with the latest changes from the remote main branch)
git switch your-branch (assumes that you were working your branch when making changes)
If you merge, you should switch back to your working branch (if you're not on it already) and merge the main branch into your branch.
Git merge main (merges the fetched changes onto your local main branch)
------------------------------
At this point, your main branch that was previously behind the remote changes (on GitHub) is now updated
git push (push your changes to GitHub as normal)
