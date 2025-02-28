// import { Types } from "mongoose";

// // List of possible names for generating random user data
// const names = ["Ava", "Emma", "Olivia", "Sophia", "Isabella", "Liam", "Noah", "Jackson", "Aiden", "Lucas", "Ethan", "Mason", "Caden", "Grayson", "Elijah", "Harper", "Amelia", "Evelyn", "Abigail", "Ella", "Henry", "Sebastian", "Levi", "Mateo", "Leo"];

// // List of possible thoughts for generating random thought data
// const thoughts = ["Just finished an amazing book!", "Coding late at night is the best!", "Excited to start my new job!", "The weather is perfect today!", "Life is a journey, not a destination.", "Trying out a new recipe tonight!", "Workout complete! Feeling great.", "Watching my favorite TV show!", "Learning GraphQL, it's awesome!", "Big things are coming soon!"];

// // List of possible reactions that can be assigned to thoughts
// const reactions = ["That's awesome!", "I totally agree!", "Wow, that's interesting!", "Couldn't have said it better myself.", "Keep it up!", "That's so funny!", "Great job!", "This made my day!", "I love this!", "Absolutely true!"];

// // Get a random item given an array
// const getRandomArrItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

// // Gets a random username
// const getRandomUsername = () => `${getRandomArrItem(names)}${Math.floor(Math.random() * 1000)}`;

// // Get a random email address
// const getRandomEmail = () => `${getRandomUsername().toLowerCase()}@example.com`;

// // Function to generate a specified number of reactions for thoughts
// const getRandomReactions = (num: number) => {
//   let results = [];
//   for (let i = 0; i < num; i++) {
//     results.push({
//       reactionId: new Types.ObjectId(),
//       reactionBody: getRandomArrItem(reactions),
//       username: getRandomUsername(),
//       createdAt: new Date(),
//     });
//   }
//   return results;
// };

// // Function to generate a specified number of random thoughts
// const getRandomThoughts = (num: number) => {
//   let results = [];
//   for (let i = 0; i < num; i++) {
//     results.push({
//       thoughtText: getRandomArrItem(thoughts),
//       createdAt: new Date(),
//       username: getRandomUsername(),
//       reactions: getRandomReactions(3),
//     });
//   }
//   return results;
// };

// // Function to generate a specified number of users
// const getRandomUsers = (num: number) => {
//   let users = [];
//   for (let i = 0; i < num; i++) {
//     users.push({
//       username: getRandomUsername(),
//       email: getRandomEmail(),
//       thoughts: getRandomThoughts(2), // Each user has 2 thoughts
//       friends: [], // Friends will be assigned later
//     });
//   }
//   return users;
// };

// // Export functions for use in seed.js
// export { getRandomUsers, getRandomThoughts, getRandomReactions };
