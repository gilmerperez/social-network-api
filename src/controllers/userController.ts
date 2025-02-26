import { Request, Response } from 'express';
import { User, Thought } from "../models/index";

// ! USERS
// GET all users http://localhost:3001/api/users
// http://localhost:3001/api/users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find(); // Retrieve all users
    res.json(users); // Return found user as JSON
  } catch (err) {
    res.status(500).json(err);
  }
}

// GET a user by _id
// http://localhost:3001/api/users/_id
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .select('-__v'); // Exclude version key

    if (!user) { // If no user found, send error message
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(user); // Return found user
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

// POST a new user
// http://localhost:3001/api/users
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body); // Create new user
    res.json(user); // Return newly created user
  } catch (err) {
    res.status(500).json(err);
  }
}

// PUT a user by _id
// http://localhost:3001/api/users/_id
// export const updateUser = async (req: Request, res: Response) => {}

// DELETE a user by _id
// http://localhost:3001/api/users/_id
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    await Thought.deleteMany({ _id: { $in: user.thoughts } }); // Delete user's thoughts
    res.json({ message: 'User and associated thoughts deleted!' })
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
}

// ! FRIENDS
// POST a new friend to a user's friend list
// http://localhost:3001/api/users/:userId/friends/:friendId

// DELETE a friend from a user's friend list
// http://localhost:3001/api/users/:userId/friends/:friendId