export class Event {
    constructor(data) {
        this.eventId = data.id
        this.creatorId = this.creatorId
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = data.startDate
        this.isCancelled = data.isCancelled
        this.category = data.category
    }
}