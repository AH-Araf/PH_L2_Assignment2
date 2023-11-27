* **PH Level-2, Assignment-2** </br>
* **This is a simple back end application built using TypeScript** </br>

* **All you need to do is to run this application locally-** </br>

1. First complete the project setup.
2. The required component libraries must be installed.
3. The project should be connected with the MongoDB.
4. Need to write some scripts om package.json file, they are-
"scripts": {
    "start": "node ./dist/server.js",
    "start:prod": "node ./dist/server.js",
    "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "lint": "eslint src --ignore-path .eslintignore --ext .ts",
    "lint:fix": "npx eslint src --fix",
    "prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
    "prettier:fix": "npx prettier --write src",
    "test": "echo \"Error: no test specified\" && exit 1"
  }.

5. Now command "npm run start:dev" to run the project locally.

