import { Schema, model, type Document } from 'mongoose';
import reactionSchema from "./Reaction";

// Thought Interface
interface IThought extends Document {
  thoughtText: string,
  createdAt: Date,
  username: string,
  reactions: [typeof reactionSchema],
  reactionCount(): number;
}

// Schema to create Thought model
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
      default: () => new Date(), // Set default value to current timestamp
      get: (createdAt: Date) => createdAt // Getter method to format timestamp on query
    },
    // The user that created this thought
    username: {
      type: String,
      required: true
    },
    // These are like replies
    reactions: {
      type: [reactionSchema]
    },
  },
  {
    toJSON: {
      // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
      virtuals: true,
      // This is so that we make sure the getters are included in the JSON output
      getters: true,
    },
    id: false,
  },
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
