import { Schema, Types, Document, ObjectId } from 'mongoose';

// Reaction Model (SCHEMA ONLY)

// Reaction Interface
interface IReaction extends Document {
  reactionId: ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

// Schema to create Reaction model
const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: [280, 'Cannot exceed 280 characters']
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: () => new Date(), // Set default value to current timestamp
      get: (createdAt: Date) => createdAt // Getter method to format timestamp on query
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  },
);

export default reactionSchema;
