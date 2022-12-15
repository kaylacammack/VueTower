import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventService } from "./EventService.js"

class TicketService {
    async createTicket(body) {
        const event = await eventService.getEventByEventId(body.eventId)
        if (!event) throw new BadRequest('Event does not exist')
        if (event.isCanceled) throw new Forbidden('Cannot attend event that is cancelled')

        const ticket = await dbContext.Tickets.create(body)
        event.capacity -= 1
        await event.save()
        await ticket.populate('event profile')
        return ticket
    }
}
export const ticketService = new TicketService()