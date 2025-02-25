import { Schema, model, type Document, Types } from 'mongoose';

interface IUser extends Document {
  username: string,
  email: string,
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
  friendCount(): number;
}

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
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true
  },
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model<IUser>('User', userSchema);

export default User;
