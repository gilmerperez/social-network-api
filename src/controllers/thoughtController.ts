import { Request, Response } from 'express';
import { Thought, User } from "../models/index";

// ! THOUGHTS
// GET all thoughts
// http://localhost:3001/api/thoughts
export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find(); // Retrieve all thoughts
    res.json(thoughts); // Return found thoughts as JSON
  } catch (err) {
    res.status(500).json(err);
  }
}

// GET a thought by _id
// http://localhost:3001/api/thoughts/_id
export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });

    if (!thought) { // If no thought found, send error message
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    res.json(thought); // Return found thought
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

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

    res.json('Created a new thought 🎉'); // Confirm successful creation
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
}

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

    res.json(thought);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return;
  }
}

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

    res.json({ message: 'Thought successfully deleted!' });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

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

    res.json(thought); // Return updated application with the new tag
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

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

    res.json(thought); // Return updated thought without the removed reaction
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}