import { Router } from 'express';
const router = Router();

// Import user controller functions
import { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend } from '../../controllers/userController'

// * Routes for user operations
router.get('/', getUsers); // GET all users - Retrieves a list of all users from the database
router.post('/', createUser); // POST a new user - Creates a new user with the provided request body data
router.get('/:userId', getSingleUser); // GET a single user by ID - Retrieves a user by their unique userId
router.put('/:userId', updateUser); // PUT (update) a user by ID - Updates an existing user with the provided request body data
router.delete('/:userId', deleteUser); // DELETE a user by ID - Removes a user from the database

// * Routes for friend operations
router.post('/:userId/friends/:friendId', addFriend); // POST (add) a friend to a user's friend list - Adds a friend's ID to the user's friends array
router.delete('/:userId/friends/:friendId', removeFriend); // DELETE (remove) a friend from a user's friend list - Removes a friend's ID from the user's friends array

// Export the router to be used in `api/index.ts`
export default router;
