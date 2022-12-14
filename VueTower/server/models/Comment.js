import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'creator'},
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
    body: { type: String, required: true },
    isAttending: { type: Boolean, required: true }
}, { timestamps: true, toJSON: { virtuals: true } } )

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'creator',
    foreignField: '_id',
    justOne: true
})