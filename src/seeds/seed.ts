import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import { getRandomName, getRandomThought } from './data.js';

(async () => {
  try {
    // Connect to database before proceeding with seeding process
    console.log('Connecting to database...');
    await db();
    console.log('Database connected.');

    const mongooseConnection = await db();

    // Delete the 'thoughts' collection if it exists
    let thoughtCheck = await mongooseConnection.db?.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck?.length) {
      await mongooseConnection.dropCollection('thoughts');
    }

    // Delete the 'users' collection if it exists
    let userCheck = await mongooseConnection.db?.listCollections({ name: 'users' }).toArray();
    if (userCheck?.length) {
      await mongooseConnection.dropCollection('users');
    }

    // Create an array to store user data
    const users = [];
    // Generate 10 random thoughts
    const thoughts = getRandomThought(10);

    // Generate 20 random users with names and ages
    for (let i = 0; i < 20; i++) {
      const fullName = getRandomName();
      const first = fullName.split(' ')[0]; // Extract first name
      const last = fullName.split(' ')[1]; // Extract last name

      users.push({
        first,
        last,
        age: Math.floor(Math.random() * (99 - 18 + 1) + 18), // Generate random age between 18 and 99
      });
    }

    // Insert generated users into the database
    await User.insertMany(users);
    // Insert generated applications into the database
    await Thought.insertMany(thoughts);

    // loop through the saved applications, for each thought we need to generate a thought response and insert the thought responses
    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
})();