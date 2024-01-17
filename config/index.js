import * as dotenv from 'dotenv';

dotenv.config();

const { URI, PORT, SECRET_ACCESS_TOKEN,API_KEY} = process.env;

export { URI, PORT, SECRET_ACCESS_TOKEN, API_KEY};