const { MongoClient } = require('mongodb');
require('dotenv').config(); // for security, use dotenv to manage credentials

// Admin connection string - securely connect to admin db
const uri = process.env.MONGO_ADMIN_URI;

async function initializeDatabase() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster (Admin DB)
    await client.connect();
    
    // Create a new database
    const dbName = process.env.DB; // Change this to your preferred db name
    const db = client.db(dbName);

    console.log(`Database '${dbName}' created or accessed.`);

    // Create a new user for this database
    const username = process.env.DBUSERNAME; // Change this
    const password = process.env.DBPASSWORD; // Strong password
    const result = await db.command({
        createUser: username,
        pwd: password,
        roles: [{ role: 'dbOwner', db: dbName }] // Correct format for roles
      });

    console.log(`User '${username}' created with role ${result}  on database '${dbName}'.`);
    
  } catch (error) {
    console.error('Error creating database or user:', error);
  } finally {
    await client.close();
  }
}

initializeDatabase();
