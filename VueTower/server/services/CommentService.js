import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventService } from "./EventService.js"

class CommentService {
    async createComment(body) {
        const event = await eventService.getEventByEventId(body.eventId)
        if (!event) throw new BadRequest ('Event does not exist')
        if (event.isCanceled) throw new Forbidden ('Cannot comment on an event that is cancelled')
        const newComment = await dbContext.Comments.create(body)
        await newComment.populate('creator event')
        return newComment
    }
    async getEventComments(eventId) {
        const event = await eventService.getEventByEventId(eventId)
        if(!event) throw new BadRequest ('Event does not exist')
        const comments = await dbContext.Comments.find({eventId}).populate('creator event')
        return comments
    }
    async removeComment(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId).populate('creator event')
        if (!comment) throw new BadRequest (`No comment at id: ${commentId}`)
        if (comment.creatorId != userId) throw new Forbidden ('Cannot delete a comment that is not yours')
        await comment.remove()
        return `Comment removed`
    }
}
export const commentService = new CommentService()