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

// const Reaction = model<IReaction>('Reaction', reactionSchema);

export default reactionSchema;