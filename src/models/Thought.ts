import { Schema, model, type Document, Types } from 'mongoose';

// Reaction Interface (SCHEMA ONLY)
interface IReaction extends Document {
  reactionId: Schema.Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}
// Reaction Schema
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
      default: () => new Date(),
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true
  },
);

// Thought Interface
interface IThought extends Document {
  thoughtText: string,
  createdAt: Date,
  username: string,
  reactions: IReaction[],
  reactionCount(): number;
}
// Thought Schema
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: [1, 'Thought must be at least 1 character long'],
      maxlength: [280, 'Thought cannot exceed 280 characters']
    },
    createdAt: {
      type: Date,
      default: () => new Date(), // Fix: Ensure default returns Date object
      get: (createdAt: Date) => createdAt
    },
    username: {
      type: String,
      required: true
    },
    reactions: {
      type: [reactionSchema]
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true, // This is so that we make sure the getters are included in the JSON output
    },
    timestamps: true
  },
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length; // Returns the number of reactions in the array
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
