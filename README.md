# Getting Started with Bingo App

Bingo game is bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It is built to a 2 built-in themes. 

- BingoGrid: A default modern look with animations with CSS Grid layout. (default)
- BingoTable: An alternative simplified edition with with Table tag.

No extra front-end libraries are used. It's built to be fully responsive using vanilla CSS. Unique numbers are generated using dynamic programminc technique for memorization using recursive calls.

## Live version
Check the live version [here on Vercel](https://react-bingo-game-gncg5kr9w-davoodmood.vercel.app/).

**The most important rules in this version:**

- A player wins by completing a row, column, or diagonal.
- There's a free slot (always on) in the middle
- You can have multiple bingos

**Extra Features**

1. Uniqe Randomized numbers and content based on B-I-N-G-O columns.
2. Two Themes
3. Card game environment design.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

- 4 tests are written To check the correct load of components.

1. 1 for load of application.
2. 3 for BingoTable theme.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Improvement Proposal

1. The game can be extended with `socket.io` node server to add multiplayer experience. 
2. Random number draw can be implemented.


## Known Issues

There is a possibility that the alternative `BingoTable theme` does not fit for screens smaller than 280 pixels width dimention. Such screen size are considerably rare today and is used in older smartphones.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
