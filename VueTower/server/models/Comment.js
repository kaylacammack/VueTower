import { Schema } from "mongoose";

export const CommentSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account'},
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
    body: { type: String, required: true },
}, { timestamps: true, toJSON: { virtuals: true } } )

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

CommentSchema.virtual('event', {
    localField: 'eventId',
    ref: 'Event',
    foreignField: '_id'
})