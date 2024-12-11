## How to run/setup the project

Follow these steps to set up and run the project:

### 1. Clone the Repository

Clone the repo using either the HTML or SSH link:

```bash
git clone <repository-url>
```

### 2. Check for Nodemon Installation

Verify if **Nodemon** is installed globally:

```bash
npm list -g nodemon
```

- If Nodemon is installed, you'll see its version. If not, you'll see an empty result or an error.

### 3. Install Dependencies

If dependencies are not installed, you can install them globally by running:

```bash
npm install -g nodemon
```

Install project-specific dependencies:

```bash
npm install --save-dev @clerk/clerk-react
npm install react-router-dom
```

### 4. Navigate to the Backend Directory

Change into the cloned repository's Backend directory:

```bash
cd Backend
```

### 5. Start the Server

To start the server, run:

```bash
npm run dev
```

### 6. Navigate to the Frontend Directory

Change into the cloned repository's Frontend directory:

```bash
cd Frontend
```

### 7. Start the Webpage

To start the webpage, run:

```bash
npm run dev
```

### Updating your main branch without overwriting your local

Your local main branch is behind the remote main branch, what do you do?

1. ```bash
git fetch origin
```
    - Can be done on any branch, fetches the latest updates from the remote repository.
2. ```bash
git branch
```
    - Used to see all local branches. Your current branch will be highlighted in green and have an asterisk at the beginning.
3. ```bash
git switch main
```
    - Switches to the main branch.
4. ```bash
git pull origin main
```
    - Updates the local main branch with the latest changes from the remote main branch.

At this point, your local main branch is equal to the remote main branch.

If you would also like your local test branch to be equal/updated with the remote main branch (could involve changes from other people), do these steps:

1. ```bash
git switch your-test-branch
```
    - Assumes that you were working on your own local test branch when making changes.
2. ```bash
git merge main
```
    - Merges the local main branch onto your local testing branch.

At this point, your main branch that was previously behind the remote changes (on GitHub) is now updated. You should continue to work on the testing branch and push any changes when done.

```bash
git push
```
    - Pushes your changes to GitHub as normal, commits changes to the remote version of whichever branch you are on.

### Pulling a remote branch that doesn't exist on your local machine yet

There is a new branch created on GitHub that you would like to access locally and be able to change the code to, but it does not exist on your local machine yet. What do you do?

1. ```bash
git branch
```
    - Check which branch you are on.
2. ```bash
git switch main
```
    - Switch to the main branch if you were not on it before.
3. ```bash
git pull
```
    - Pulls all the new changes from the remote main branch. You should see some lines that say something similar to:

    ```plaintext
    From github.com:IbrahimMoftah329/Capstone
    42a3e3f..2ca3db6  main           -> origin/main
    * [new branch]      Backend-models -> origin/Backend-models
    * [new branch]      example-branch -> origin/example-branch
    * [new branch]      example-branch-2 -> origin/example-branch-2
    ```
4. ```bash
git switch example-branch
```
    - Simultaneously switches to and sets the branch origin to the remote branch.
5. ```bash
git branch
```
    - Check that you are now on the new branch.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- `@vitejs/plugin-react` uses Babel for Fast Refresh
- `@vitejs/plugin-react-swc` uses SWC for Fast Refresh

To install Vite in your project:

```bash
npm install vite --save-dev
```

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes. You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed! See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project. Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

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

### `npm run build` Fails to Minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


