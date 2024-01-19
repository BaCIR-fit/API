import * as dotenv from 'dotenv';

dotenv.config();

const { URI, HOST, PORT, SECRET_ACCESS_TOKEN,API_KEY} = process.env;

export { URI, HOST, PORT, SECRET_ACCESS_TOKEN, API_KEY};


//aft login :
// get user activities
//register user to activity