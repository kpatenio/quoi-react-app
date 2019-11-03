# QUOI
The app to use when you ask yourself « Quoi » !

## About
QUOI is a work-in-progress French dictionary React app that utilizes the [Collins Dictionary API](https://www.collinsdictionary.com/api/). This project was bootstrapped using [Create React App](https://github.com/facebook/create-react-app).

To learn more about QUOI's progress and/or history, check out the wiki [here](https://github.com/kpatenio/quoi-react-app/wiki).

## Dependencies
Should be installed when running `npm install`. Frameworks and libraries currently in use:
- React 16.9
- TypeScript 3.5.3
- [antd](https://ant.design/) - UI components
- [less](http://lesscss.org/) - CSS preprocessor compatible with antd
- [react-i18next](https://react.i18next.com/) and i18next - for translating the user interface between English and French
- [Axios](https://github.com/axios/axios) - a promise-based http client for javascript
- [dompurify](https://github.com/cure53/DOMPurify) - to sanitize responses from APIs and prevent XSS attacks

## Dev Dependencies
Not needed to run the app, but required for debugging and additional functionality (such as inserting styles into antd components):
- [react-testing-library](https://testing-library.com/docs/react-testing-library/intro)
- [react-app-rewired](https://github.com/timarney/react-app-rewired) - this allows us to modify create-react-app's config _without_ ejecting our app and forking the official create-react-app repo! This was needed to ensure we could run `babel-plugin-import`. Be sure to follow the instructions for antd compatibility [here](https://ant.design/docs/react/use-in-typescript#Advanced-Guides).
- [customize-cra](https://github.com/arackaf/customize-cra) - needed to ensure `react-app-rewired` works for antd. Read more [here](https://ant.design/docs/react/use-in-typescript#Advanced-Guides).
- babel-plugin-import - needed to ensure we only import requested antd components. This will speed up our app startup and not load all antd components! See instructions [here](https://ant.design/docs/react/use-in-typescript#Use-babel-plugin-import) and [here](https://github.com/ant-design/babel-plugin-import#style).
- [less-loader](https://github.com/webpack-contrib/less-loader) - designed to compile LESS to CSS. This allows us to globally set colour themes for antd components, as well as import less stylesheets directly into our code. Read official antd instructions [here](https://ant.design/docs/react/use-in-typescript#Customize-Theme). Also read the customize-cra api documentation [here](https://github.com/arackaf/customize-cra/blob/f546a00b1d0220cf1cfcb6ff7b5db3f7fa9c2f59/api.md#addlessloaderloaderoptions).
- [cypress.io](https://www.cypress.io/) - e2e testing framework (Chrome only)

## Server and API Calls
HTTP calls are made via Axios to a Flask server hosted in [quoi-flask-backend](https://github.com/kpatenio/quoi-flask-backend) (which, at the moment, can only be run locally). The Flask server calls the Collins API and then returns any retrieved data back to the React app.

## Styling and Components
All the amazing components used were made by the amazing `antd` developers! The LESS preprocessor was used to customize antd components; note that with `less-loader`, there is no need to manually compile `.less` files. All it takes is a simple `.less` file import!

### My styling disappeared!
If, for any reason, all `.less` styles disappear from the page, try rerunning the app using `npm start`.

## Running tests
### Unit tests (Jest)
To run all tests at once:
```
npm test
```
To run all tests in watch mode:
```
npm run test-watch
```

### E2E tests (Cypress.io)
To run Cypress tests once:
```
npx cypress
```
To run Cypress tests in watch mode:
```
npx cypress open
```

## Available Scripts (from create-react-app)
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
