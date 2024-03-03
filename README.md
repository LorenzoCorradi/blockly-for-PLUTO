# Blockly for PLUTO

## Purpose

Blockly is a library that uses graphical blocks to represent code and thus lets the user visually create a program. The goal of this project is to create an application based on blockly, that outputs PLUTO scripts instead of code. In particular, users can for example put blocks of commands (eg to do movement of our prototype rover) into a control logic, and then a corresponding PLUTO script will be generated.

## Quick Start for developing purpose

1. [Install](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) npm if you haven't before.
2. Run `git clone https://github.com/LorenzoCorradi/blockly-for-PLUTO.git`
3. Run `cd blockly-for-PLUTO`
4. Run `npm install` to install the required dependencies.
5. Run `npm run start` to run the development server and see the app in action.
6. If you make any changes to the source code, just refresh the browser while the server is running to see them.

## Have a look to the developed site
You have two options:
1. Download the /dist directory and open index.html with the browser.
2. Go to https://blockly-415916.ew.r.appspot.com/, it's a simple flask server with a deploy of the project.


### Source Code
- `index.html` contains the skeleton HTML for the page. This file is modified during the build to import the bundled source code output by webpack.
- `index.js` is the entry point of the app. It configures Blockly and sets up the page to show the blocks, the generated code, and the output of running the code in JavaScript.
- `serialization.js` has code to save and load the workspace using the browser's local storage. This is how your workspace is saved even after refreshing or leaving the page. You could replace this with code that saves the user's data to a cloud database instead.
- `toolbox.js` contains the toolbox definition for the app. 
- `blocks/pluto.js` contains the blocks for pluto scripts. 
- `generators/pluto.js` contains the PLUTO generator for  any custom blocks created.

## Serving

To run your app locally, run `npm run start` to run the development server. This mode generates source maps and ingests the source maps created by Blockly, so that you can debug using unminified code.

To deploy your app so that others can use it, run `npm run build` to run a production build. This will bundle your code and minify it to reduce its size. You can then host the contents of the `dist` directory on a web server of your choosing.

## Brief explanation of the workflow:
The documentation regarding the creation of new languages is not entirely clear and comprehensive (https://github.com/google/blockly/issues/6992). However, it is possible to take inspiration from the languages already generated and refer to the [Google codelab](https://blocklycodelabs.dev/codelabs/custom-generator/index.html) about the build of a custom generator. <ins> This codelab serves as the starting point for this project. </ins>
To carry out the project, two fundamental steps are essentially required:
- the creation of custom blocks, facilitated by the [Blockly Developer Tools](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html) provided by Google.
- the generation of code that allows generating PLUTO syntax from each block.

