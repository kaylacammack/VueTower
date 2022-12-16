import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventService } from "./EventService.js"

class TicketService {
    async createTicket(body) {
        const event = await eventService.getEventByEventId(body.eventId)
        if (!event) throw new BadRequest('Event does not exist')
        if (event.isCanceled) throw new Forbidden('Cannot attend event that is cancelled')
        if (event.capacity === 0) throw new BadRequest('Event is at capacity')
        const ticket = await dbContext.Tickets.create(body)
        event.capacity -= 1
        await event.save()
        await ticket.populate('event profile')
        return ticket
    }

    async getMyTickets(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId }).populate('event')
        return tickets
    }
    async getEventTickets(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId }).populate('profile')
        return tickets
    
    }
    async removeTicket(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId).populate('event')
        if (!ticket) throw new BadRequest (`No ticket at id: ${ticketId}`)
        if (ticket.accountId != userId) throw new Forbidden ('Cannot delete a ticket that is not yours')
        const event = await dbContext.Events.findById(ticket.eventId).populate('creator')
        await ticket.remove()
        if (event) {
            event.capacity += 1
            await event.save()
        }
        return `ticket deleted`
        

    }
}

export const ticketService = new TicketService()