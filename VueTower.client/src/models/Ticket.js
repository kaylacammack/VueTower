export class Ticket {
    constructor(data) {
        this.ticketId = data.id
        this.eventId = data.eventId
        this.accountId = data.accountId
        this.createdAt = data.createdAt
        this.event = data.event
        this.updatedAt = data.updatedAt
    }
}