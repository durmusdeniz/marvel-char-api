Marvel Character API System

### Requirements
  
  `mocha` is needed to run the tests.
  
### Installation
    
   To be able to run the tests, you should have mocha installed to your computer.
   To install, simply run
   
   `npm install --global mocha` 
   
   _As of v8.0.0, Mocha requires Node.js v10.12.0 or newer._
   
  Then to to run the application, you need to install the dependencies
  
  `npm install`
  
  Finally, you can run the application. As there are required API keys for Marvel,
  you need to pass these by ENV vars with the start up command:
  
  `MARVEL_PUBLIC_KEY=<your_public_key> MARVEL_PRIVATE_KEY=<your_private_key> npm start`
  
  Once server is up, you can access Swagger UI on `http://localhost:8080/api-docs` and start retrieving the character details.
    
  Tests are also run in a similar manner:
  
  `MARVEL_PUBLIC_KEY=<your_public_key> MARVEL_PRIVATE_KEY=<your_private_key> mocha -R spec spec.js`
    