const {Client}=require("pg");
require("dotenv").config();

const SQL=`
CREATE TABLE IF NOT EXISTS users(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username TEXT UNIQUE NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    password TEXT,
    membership varchar(15),
    admin boolean
);

CREATE TABLE IF NOT EXISTS messages(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title varchar(20),
    content TEXT NOT NULL,
    username TEXT,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`




async function runMigrations() {
    const client=new Client({
        connectionString:process.env.CONNECTION_STRING
    })
  
    try {
      console.log("Connecting to database...");
      await client.connect();
      
      console.log("Running migrations...");
      await client.query(SQL);
      
      console.log("Migrations completed successfully!");
    } catch (err) {
      console.error("Migration failed:", err);
    } finally {
      await client.end();
      console.log("Disconnected from database");
    }
  }
  
  runMigrations();