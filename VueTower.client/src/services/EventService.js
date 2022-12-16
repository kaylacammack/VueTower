import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class EventService {
    async createEvent(body) {
        const res = await api.post('api/events', body)
        logger.log('[Create Event]', res.data)
        AppState.events.unshift(res.data)
        return res.data
    }
    async getAllEvents() {
        const res = await api.get('api/events')
        logger.log('[Get all events]', res.data)
        AppState.events = res.data
    }
    async getEventByEventId(eventId) {
        const res = await api.get('api/events/' + eventId)
        logger.log('[Get event by event Id]', res.data)
        AppState.activeEvent = res.data
    }
    async editEvent(eventData) {
        const res = await api.put('api/events/' + eventData.id, eventData)
        logger.log('[Edit Event]', res.data)
        AppState.events = new Event(res.data)
    }
    async cancelEvent(eventData) {
        const res = await api.put('api/events/' + eventData.id, eventData)
        logger.log('[Cancel event]', res.data)
        AppState.events = new Event(res.data)
    }
}
export const eventService = new EventService()