import dotenv from "dotenv";
dotenv.config();

let db_url = process.env.DATABASE_URL;

if(process.env.NODE_ENV === 'test') {
  db_url = process.env.DATABASE_TEST_URL;
}

export default db_url;