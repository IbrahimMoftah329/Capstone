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
```git clone <repository-url> ``` 

### 2. Check for Nodemon Installation Verify if **Nodemon** is installed globally: 
```npm list -g nodemon ``` 
- If Nodemon is installed, you'll see its version. If not, you'll see an empty result or an error.

### 3. Install Nodemon If Nodemon is not installed, you can install it globally by running: 
```npm install -g nodemon ``` 

```npm install --save-dev @clerk/clerk-react ```

```npm install react-router-dom ```

### 4. Navigate to the Backend Directory Change into the cloned repository's Backend directory: 
```cd Backend ``` 

### 5. Start the Server To start the server, run: 
```npm run dev ``` 

### 6. Access the Application Open your web browser (Safari or Chrome) and navigate to: 
``` http://localhost:4000/ ```


### 7. Updating your main branch without overwriting your local

Your local main branch is behind the remote main branch, what do you do?

 - ```git fetch origin``` (can be done on any branch, fetches the latest updates from the remote repository)
 - ```git branch``` (used to see all local branches, your current branch will be highlighted in green and have an asterisk at the beginning)
 - ```git switch main``` (switches to main branch)
 - ```git pull origin main``` (Update the local main branch with the latest changes from the remote main branch)

At this point, your local main branch is equal to the remote main branch. 

If you would also like your local test branch to be equal/updated with the remote main branch (could involve changes from other people), do these steps: 

 - ```git switch your-test-branch``` (assumes that you were working your own local test branch when making changes)
 - ```git merge main``` (merges the local main branch onto your local testing branch)

At this point, your main branch that was previously behind the remote changes (on github) is now updated
you should continue to work on the testing branch and push any changes when done
git push (push your changes to github as normal, pushes commited changes onto the remote version of whichever branch you are on)

### 8. Pulling a remote branch that doesn't exist on your local machine yet.

There is a new branch created on Github that you would like to access locally and be able to change the code to, but it does
not exist on your local machine yet, what do you do?

 - ```git branch``` (Check which branch you are on)
 - ```git switch main``` (Switch to the main branch if you were not on it before)
 - ```git pull``` (pulls all the new changes from the remote main branch)
 - You should see some lines that say something similar to:
    From github.com:IbrahimMoftah329/Capstone
    42a3e3f..2ca3db6  main           -> origin/main\
    \* [new branch]      Backend-models -> origin/Backend-models\
    \* [new branch]      example-branch -> origin/example-branch\
    \* [new branch]      example-branch-2 -> origin/example-branch-2
 - ```git switch example-branch``` (Simultaneously switches to and sets the branch origin to the remote branch)
 - ```git branch``` (Check that you are now on the new branch)
