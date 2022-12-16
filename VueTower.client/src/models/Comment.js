export class Comment {
    constructor(data) {
        this.commentId = data.id
        this.creatorId = data.creatorId
        this.eventId = data.eventId
        this.body = data.body
    }
}