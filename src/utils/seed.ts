// import connection from '../config/connection.js';
// import { User, Thought } from '../models/index.js';
// import { getRandomUsers, getRandomThoughts } from './data.js';

// const seedDatabase = async () => {
//   try {
//     connection.once('open', async () => {
//       console.log('Connected to database');

//       // Clear existing data
//       await User.deleteMany({});
//       await Thought.deleteMany({});
//       console.log('Database cleared');

//       // Generate users and thoughts dynamically
//       const users = getRandomUsers(10); // Generate 10 users
//       const thoughts = getRandomThoughts(20); // Generate 20 thoughts

//       // Insert users and explicitly type the result
//       const createdUsers = await User.insertMany(users) as Array<{ _id: string; username: string }>;
//       console.log('Users seeded');

//       // Map usernames to their _id for thought references
//       const userMap = createdUsers.reduce((acc, user) => {
//         acc[user.username] = user._id; // Now TypeScript knows user.username and user._id exist
//         return acc;
//       }, {} as Record<string, string>);

//       // Attach thoughts to users and insert
//       for (const thought of thoughts) {
//         const userId = userMap[thought.username];
//         if (userId) {
//           const createdThought = await Thought.create({ ...thought, userId });
//           await User.findByIdAndUpdate(userId, { $push: { thoughts: createdThought._id } });
//         }
//       }
//       console.log('Thoughts seeded');

//       // Establish random friendships
//       for (const user of createdUsers) {
//         const friendIds = createdUsers
//           .filter((u) => (u as { _id: string })._id !== user._id) // Ensure TypeScript recognizes _id
//           .sort(() => 0.5 - Math.random()) // Shuffle
//           .slice(0, Math.floor(Math.random() * 4) + 1) // Random selection
//           .map((u) => (u as { _id: string })._id);

//         await User.findByIdAndUpdate(user._id, { $push: { friends: { $each: friendIds } } });
//       }
//       console.log('Friendships established');

//       console.log('Database seeding complete');
//       process.exit(0);
//     });
//   } catch (err) {
//     console.error('Error seeding database:', err);
//     process.exit(1);
//   }
// };

// seedDatabase();
