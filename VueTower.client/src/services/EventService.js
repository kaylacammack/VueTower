import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class EventService {
    async createEvent(body) {
        try {
            const res = await api.post('api/events', body)
            logger.log('[Create Event]', res.data)
            AppState.activeEvent = new Event(res.data)
            return res.data
        } catch (error) {
            Pop.error(error.message)
            logger.error(error)
        }
    }
    async getAllEvents() {
        try {
            const res = await api.get('api/events')
            logger.log('[Get all events]', res.data)
            AppState.events = res.data
        } catch (error) {
            Pop.error(error.message)
            logger.error(error)
        }
    }
    async getEventByEventId(eventId) {
        try {
            const res = await api.get('api/events/' + eventId)
            logger.log('[Get event by event Id]', res.data)
            AppState.activeEvent = new Event(res.data)
        } catch (error) {
            Pop.error(error.message)
            logger.error(error)
        }
    }
    async getEventTickets(eventId) {
        try {
            const res = await api.get('api/events/' + eventId + '/tickets')
            logger.log('[Get event tickets]', res.data)
            AppState.events = res.data
        } catch (error) {
            Pop.error(error.message)
            logger.error(error)
        }
    }
    async getEventComments(eventId) {
        try {
            const res = await api.get('api/events/' + eventId + '/comments')
            logger.log('[Get event comments]', res.data)
            AppState.comments = res.data
        } catch (error) {
            Pop.error(error.message)
            logger.error(error)
        }
    }
    async editEvent(eventData) {
        try {
            const res = await api.put('api/events/' + eventData.id, eventData)
            logger.log('[Edit Event]', res.data)
            AppState.events = new Event(res.data)
        } catch (error) {
            Pop.error(error.message)
            logger.error(error)
        }
    }
    async cancelEvent(eventData) {
        try {
            const res = await api.put('api/events/' + eventData.id, eventData)
            logger.log('[Cancel event]', res.data)
            AppState.events = new Event(res.data)
        } catch (error) {
            Pop.error(error.message)
            logger.error(error)
        }
    }
}
export const eventService = new EventService()