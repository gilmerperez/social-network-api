import { Request, Response } from 'express';
import { User, Thought } from "../models/index.js";

// ! USERS
// GET all users http://localhost:3001/api/users
// http://localhost:3001/api/users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find(); // Retrieve all users
    return res.json(users); // Return found user as JSON
  } catch (err) {
    return res.status(500).json(err);
  }
};

// GET a user by _id
// http://localhost:3001/api/users/_id
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .select('-__v'); // Exclude version key

    if (!user) { // If no user found, send error message
      return res.status(404).json({ message: 'No user with that ID' });
    }

    return res.json(user); // Return found user
  } catch (err) {
    return res.status(500).json(err);
  }
};

// POST a new user
// http://localhost:3001/api/users
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body); // Create new user
    return res.json(user); // Return newly created user
  } catch (err) {
    return res.status(500).json(err);
  }
};

// PUT a user by _id
// http://localhost:3001/api/users/_id
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// DELETE a user by _id
// http://localhost:3001/api/users/_id
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    await Thought.deleteMany({ _id: { $in: user.thoughts } }); // Delete user's thoughts
    return res.json({ message: 'User and associated thoughts deleted!' })
  } catch (err) {
    return res.status(500).json(err);
  }
};

// ! FRIENDS
// POST a new friend to a user's friend list
// http://localhost:3001/api/users/:userId/friends/:friendId
export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } }, // Prevent duplicates
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// DELETE a friend from a user's friend list
// http://localhost:3001/api/users/:userId/friends/:friendId
export const removeFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } }, // Remove from array
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};