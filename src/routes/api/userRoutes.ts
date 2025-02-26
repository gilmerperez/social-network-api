import { Router } from 'express';
const router = Router();

// Import user controller functions
import { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend } from '../../controllers/userController'

router.route('/').get(getUsers).post(createUser);

router.route('/:_id').get(getSingleUser).put(updateUser).delete(deleteUser)

// Export the router to be used in `api/index.ts`
export default router;
