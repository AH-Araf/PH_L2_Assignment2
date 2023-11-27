* **PH Level-2, Assignment-2** </br>
* **This is a simple back end application built using TypeScript** </br>

* **All you need to do is to run this application locally-** </br>

1. First complete the project setup.
2. The required component libraries must be installed.
3. The project should be connected with the MongoDB.
4. Need to write some scripts om package.json file, they are- </br>
"scripts": { </br>
    "start": "node ./dist/server.js", </br>
    "start:prod": "node ./dist/server.js", </br>
    "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts", </br>
    "build": "tsc", </br>
    "lint": "eslint src --ignore-path .eslintignore --ext .ts", </br>
    "lint:fix": "npx eslint src --fix", </br>
    "prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"", </br>
    "prettier:fix": "npx prettier --write src", </br>
    "test": "echo \"Error: no test specified\" && exit 1" </br>
  }. </br>

5. Now command "npm run start:dev" to run the project locally.

* **Live deployment link:** </br>
https://bright-red-millipede.cyclic.app</br>

* **Endpoints of this project-** </br>
//users </br>
post- '/api/users' </br>
get- '/api/users' </br>
get- '/api/users/:userId' </br>
put- '/api/users/:userId' </br>
delete- '/api/users/:userId' </br>

//orders </br>
put- '/api/users/:userId/orders' </br>
get- '/api/users/:userId/orders' </br>
get- '/api/users/:userId/orders/total-price' </br>

* **Example** </br>
https://bright-red-millipede.cyclic.app/api/users</br>