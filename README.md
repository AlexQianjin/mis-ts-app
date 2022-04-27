# mis-ts-app
vite react with typescript and apollo graphql client

# Setup
## ESlint
- npm install eslint --save-dev
- npx eslint --init
- echo ''> .eslintignore

## Prettier
- npm install --save-dev --save-exact prettier
- echo {}> .prettierrc.json
- echo ''> .prettierignore

## Husky 
### Automatic
- npx husky-init && npm install

### Manual
- npm install husky --save-dev
- npx husky install
- npm set-script prepare "husky install"
``` json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

## lint staged
- npm install --save-dev lint-staged
``` json
{
  "lint-staged": {
    "*": "your-cmd"
  }
}
```


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
