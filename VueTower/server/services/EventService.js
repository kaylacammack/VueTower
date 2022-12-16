import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventService {
    async getAllEvents(query) {
        const events = await dbContext.Events.find(query).populate('creator')
        return events
    }
    async getEventByEventId(eventId) {
        const event = await dbContext.Events.findById(eventId).populate('creator')
        return event
    }
    async createEvent(body) {
        const event = await dbContext.Events.create(body)
        await event.populate('creator')
        return event 
    }
    async updateEvent(eventId, eventData, userId) {
        const event = await this.getEventByEventId(eventId)
        if (!event) throw new BadRequest (`No event exists by event Id: ${eventId}`)
        if (event.creatorId != userId) throw new Forbidden('Not your event to modify')
        if (event.isCanceled) throw new Forbidden ('Cannot modify a cancelled event')

        event.name = eventData.name ? eventData.name : event.name
        event.description = eventData.description ? eventData.description : event.description
        event.coverImg = eventData.coverImg ? eventData.coverImg : event.coverImg
        event.location = eventData.location ? eventData.location : event.capacity = eventData.capacity !== undefined ? eventData.capacity : event.capacity
        event.startDate = eventData.startDate ? eventData.startDate : event.startDate
        event.type = eventData.type ? eventData.type : event.type

        event.populate('creator')
        await event.save()
        return event
    }
    async cancelEvent(eventId, userId) {
        const event = await this.getEventByEventId(eventId)
        if(!event) throw new BadRequest ('No event at this id')
        if(event.creatorId != userId) throw new Forbidden('Not your event to cancel')
        
        event.isCanceled = !event.isCanceled
        await event.save()
        return `Cancelled ${event.name}`
    }

   
}
export const eventService = new EventService()