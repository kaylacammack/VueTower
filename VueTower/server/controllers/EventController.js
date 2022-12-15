import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventService } from "../services/EventService.js";
import BaseController from "../utils/BaseController";


export class EventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllEvents)
            .get('/:eventId', this.getEventByEventId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.updateEvent)
            .delete('/:eventId', this.cancelEvent)
    }

    async getAllEvents(req, res, next) {
        try {
            const events = await eventService.getAllEvents(req.query)
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }
    async getEventByEventId(req, res, next) {
        try {
            const event = await eventService.getEventByEventId(req.params.eventId)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async createEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const event = await eventService.createEvent(req.body)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }
    async updateEvent(req, res, next) {
        try {
            const updatedEvent = await eventService.updateEvent(req.params.eventId, req.body, req.userInfo.id)
            return res.send(updatedEvent)
        } catch (error) {
            next(error)
        }
    }
    async cancelEvent(req, res, next) {
        try {
            const message = await eventService.cancelEvent(req.params.eventId, req.userInfo.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
   
    
}