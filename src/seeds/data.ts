// List of possible names for generating random user data
const names = ["Ava", "Emma", "Olivia", "Sophia", "Isabella", "Liam", "Noah", "Jackson", "Aiden", "Lucas", "Ethan", "Mason", "Caden", "Grayson", "Elijah", "Harper", "Amelia", "Evelyn", "Abigail", "Ella", "Henry", "Sebastian", "Levi", "Mateo", "Leo"];

// List of possible thoughts for generating random thought data
const thoughts = ["Just finished an amazing book!", "Coding late at night is the best!", "Excited to start my new job!", "The weather is perfect today!", "Life is a journey, not a destination.", "Trying out a new recipe tonight!", "Workout complete! Feeling great.", "Watching my favorite TV show!", "Learning GraphQL, its awesome!", "Big things are coming soon!"];

// List of possible reactions that can be assigned to thoughts
const reactions = ["That's awesome!", "I totally agree!", "Wow, that's interesting!", "Couldn't have said it better myself.", "Keep it up!", "That's so funny!", "Great job!", "This made my day!", "I love this!", "Absolutely true!"];

// Get a random item given an array
const getRandomArrItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate a specified number of random thoughts
// Each thought has a random description, published status, build success status, and reactions
const getRandomThought = (int: number) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      published: Math.random() < 0.5, // Random boolean value for published status
      description: getRandomArrItem(thoughts), // Random thought
      buildSuccess: Math.random() < 0.5, // Random boolean value for build success
      reactions: [...getThoughtReaction(3)], // Generates an array of 3 random thought reactions
    });
  }
  return results;
};

// Function to generate a specified number of reactions for thoughts
// Each reaction has a reactionBody and is associated with a randomly generated username
const getThoughtReaction = (int: number) => {
  if (int === 1) {
    return getRandomArrItem(reactions);
  }
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(reactions), // Random reaction from reactions array
      username: getRandomName(), // Randomly generated username
    });
  }
  return results;
};

// Export functions for use in seed.js
export { getRandomName, getRandomThought };
