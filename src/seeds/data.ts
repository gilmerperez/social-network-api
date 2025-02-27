// List of possible names for generating random user data
const names = [
    'Ava', 'Emma', 'Olivia', 'Sophia', 'Isabella', 'Liam', 'Noah', 'Jackson', 'Aiden', 'Lucas', 'Ethan', 'Mason', 'Caden', 'Grayson', 'Elijah', 'Harper', 'Amelia', 'Evelyn', 'Abigail', 'Ella', 'Henry', 'Sebastian', 'Levi', 'Mateo', 'Leo'
];

// List of possible thoughts for generating random thought data
const thoughts = [
    'Just finished an amazing book!', 'Coding late at night is the best!', 'Excited to start my new job!', 'The weather is perfect today!', 'Life is a journey, not a destination.', 'Trying out a new recipe tonight!', 'Workout complete! Feeling great.', 'Watching my favorite TV show!', 'Learning GraphQL, its awesome!', 'Big things are coming soon!'
];

// List of possible reactions that can be assigned to thoughts
const reactions = [
    'That’s awesome!', 'I totally agree!', 'Wow, that’s interesting!', 'Couldn’t have said it better myself.', 'Keep it up!', 'That’s so funny!', 'Great job!', 'This made my day!', 'I love this!', 'Absolutely true!'
];

// Get a random item given an array
const getRandomArrItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

// Function to generate a specified number of random users
const getRandomUsers = (num: number) => {
    const users = [];
    for (let i = 0; i < num; i++) {
        users.push({
            username: getRandomArrItem(names), // Random name for the username
            email: `${getRandomArrItem(names).toLowerCase()}${Math.floor(Math.random() * 100)}@example.com`, // Random email
        });
    }
    return users;
};

// Function to generate a specified number of random thoughts
const getRandomThoughts = (num: number, users: any[]) => {
    const thoughtsArr = [];
    for (let i = 0; i < num; i++) {
        thoughtsArr.push({
            thoughtText: getRandomArrItem(thoughts), // Random thought message
            username: getRandomArrItem(users).username, // Random user associated with the thought
            createdAt: new Date(), // Current timestamp
        });
    }
    return thoughtsArr;
};

// Function to generate random reactions for thoughts
const getRandomReactions = (num: number, users: any[]) => {
    const reactionsArr = [];
    for (let i = 0; i < num; i++) {
        reactionsArr.push({
            reactionBody: getRandomArrItem(reactions), // Random reaction from reactions array
            username: getRandomArrItem(users).username, // Randomly generated username
            createdAt: new Date(), // Current timestamp
        });
    }
    return reactionsArr;
};

// Export functions for use in seed.ts
export { getRandomUsers, getRandomThoughts, getRandomReactions };
