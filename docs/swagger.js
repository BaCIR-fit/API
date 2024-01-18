import swaggerAutogen from 'swagger-autogen';
import { HOST, PORT} from "../config/index.js"; // get the env vars from config dotenv
const doc = {
  info: {
    title: 'Basic Cir API',
    description: 'API for basic cir blabla',  // by default: ''
  },
  host:HOST+':'+PORT,
  basePath: '/',  // by default: '/'
  schemes: ['http'],   // by default: ['http']
  consumes: ['application/json'],  // by default: ['application/json']
  produces: ['application/json'],  // by default: ['application/json']
  tags: [        // by default: empty Array
  {
    name: 'default',
    description: 'base path'
  },
    {
      name: 'Auth/',
      description: 'Authentication relative\'s endpoints'
    },
    {
      name: 'Users/',
      description: 'public user endpoints'
    },
    {
      name: 'Admin/',         // Tag name
      description: 'admin\'s endpoints',  // Tag description
    },
    {
      name: 'Admin/Activity',         // Tag name
      description: 'Managing activities (add,delete,edit....)',  // Tag description
    },
    {
      name: 'Admin/Clubs',         // Tag name
      description: 'Managing clubs (add,delete,edit....)',  // Tag description
    },
    {
        name: 'Admin/Rooms',
        description: 'Manage rooms'
    },
    
  ],
  securityDefinitions: {},  // by default: empty object
  definitions: {
    helathResponse: {
      // code: msg.response.CAG001.code,
      // message: msg.response.CAG001.message,
    },
    'errorResponse.400': {
      // code: msg.response.CAGE002.code,
      // message: msg.response.CAGE002.message,
    },
    'errorResponse.403': {
      // code: msg.response.CAGE001.code,
      // message: msg.response.CAGE001.message,
    },
    'errorResponse.404': {
      "code": "404",
      "message": "Not found",
    },
    'errorResponse.500': {
      // code: msg.response.CAGE003.code,
      // message: msg.response.CAGE003.message,
    }
  },          // by default: empty object (Swagger 2.0)
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./server.js', './controllers/*'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */
swaggerAutogen(outputFile, endpointsFiles, doc);
