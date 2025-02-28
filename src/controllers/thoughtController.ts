import { Request, Response } from 'express';
import { Thought, User } from "../models/index.js";

// ! THOUGHTS
// GET all thoughts
// http://localhost:3001/api/thoughts
export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find(); // Retrieve all thoughts
    return res.json(thoughts); // Return found thoughts as JSON
  } catch (err) {
    return res.status(500).json(err);
  }
};

// GET a thought by _id
// http://localhost:3001/api/thoughts/_id
export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });

    if (!thought) { // If no thought found, send error message
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    return res.json(thought); // Return found thought
  } catch (err) {
    return res.status(500).json(err);
  }
};

// POST a new thought
// http://localhost:3001/api/thoughts
export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body); // Create a new thought
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thought._id } }, // Add thought ID to the user's thoughts array
      { new: true }
    );

    if (!user) { // If no user found, send error message
      return res.status(404).json({ message: 'Thought created, but found no user with that ID' })
    }

    return res.json('Created a new thought 🎉'); // Confirm successful creation
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// PUT a thought by _id
// http://localhost:3001/api/thoughts/_id
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body }, // Update fields with new values
      { runValidators: true, new: true }
    );

    if (!thought) { // If no thought found, send error message
      return res.status(404).json({ message: 'No thought with this ID!' });
    }

    return res.json(thought);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// DELETE a thought by _id
// http://localhost:3001/api/thoughts/_id
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (!thought) { // If no thought found, send error message
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    const user = await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } }, // Remove thought reference from user
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Thought created but no user with this ID!' });
    }

    return res.json({ message: 'Thought successfully deleted!' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// ! REACTIONS
// POST a reaction stored in a single thought's reactions array field
// http://localhost:3001/api/thoughts/:thoughtId/reactions
export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } }, // Add new reaction to the reactions array
      { runValidators: true, new: true }
    );

    if (!thought) { // If no thought found, send error message
      return res.status(404).json({ message: 'No thought with this ID!' });
    }

    return res.json(thought); // Return updated application with the new tag
  } catch (err) {
    return res.status(500).json(err);
  }
};

// DELETE a reaction by the reaction's reactionId value
// http://localhost:3001/api/thoughts/:thoughtId/reactions
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } }, // Remove reaction by ID from reactions array
      { runValidators: true, new: true }
    );

    if (!thought) { // If no thought found, send error message
      return res.status(404).json({ message: 'No thought with this ID!' });
    }

    return res.json(thought); // Return updated thought without the removed reaction
  } catch (err) {
    return res.status(500).json(err);
  }
};