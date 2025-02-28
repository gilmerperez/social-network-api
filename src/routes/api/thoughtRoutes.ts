import { Router } from 'express';
const router = Router();

// Import thought controller functions
import { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, removeReaction } from '../../controllers/thoughtController.js';

// * Routes for thought operations
router.get('/', getThoughts); // GET all thoughts - Retrieves a list of all thoughts from the database
router.get('/:thoughtId', getSingleThought); // GET a single thought by ID - Retrieves a thought by its unique thoughtId
router.post('/', createThought); // POST a new thought - Creates a new thought with the provided request body data
router.put('/:thoughtId', updateThought); // PUT (update) a thought by ID - Updates an existing thought with the provided request body data
router.delete('/:thoughtId', deleteThought); // DELETE a thought by ID - Removes a thought from the database

// * Routes for reaction operations
router.post('/:thoughtId/reactions', addReaction); // POST (add) a reaction to a thought - Adds a reaction to the specified thought
router.delete('/:thoughtId/reactions/:reactionId', removeReaction); // DELETE (remove) a reaction by reactionId - Removes a reaction from a thought

// Export the router to be used in `api/index.ts`
export default router;