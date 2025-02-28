import { Schema, model, Document, ObjectId } from 'mongoose';

// User Interface
interface IUser extends Document {
  username: string,
  email: string,
  thoughts: ObjectId[];
  friends: ObjectId[];
  friendCount(): number;
}

// Schema to create User model
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      // Mongoose's matching validation
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    // Array of _id values referencing the Thought model
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    // Array of _id values referencing the User model (self-reference)
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
  },
  {
    toJSON: {
      // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
      virtuals: true,
    },
    id: false,
  },
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

const User = model<IUser>('User', userSchema);

export default User;
