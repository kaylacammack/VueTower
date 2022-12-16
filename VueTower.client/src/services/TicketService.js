import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"
import { Ticket } from "../models/Ticket.js"
import { Event } from "../models/Event.js"


class TicketService {
    async createTicket(body) {
        try {
            const res = await api.post('api/tickets', body)
            logger.log('[Create ticket]', res.data)
            AppState.activeEvent = new Event(res.data)
            // AppState.tickets.push(res.data)
            // AppState.myTickets.push(res.data)
            // AppState.activeEvent.capacity--
        } catch (error) {
            Pop.error(error.message)
            logger.error(error)
        }
    }
    async getMyTickets() {
        try {
            const res = await api.get('account/tickets')
            logger.log('[Get my tickets]', res.data)
            AppState.myTickets = res.data
        } catch (error) {
            Pop.error(error.message)
            logger.error(error)
        }
    }
    async removeTicket(ticketId) {
        try {
            const res = await api.delete('api/tickets/' + ticketId)
            logger.log('[Deleting ticket]', res.data)
            // let ticketIndex = AppState.tickets.findIndex(t => t.ticketId === ticketId)
            // if (ticketIndex >= 0){
            //     AppState.splice(ticketIndex, 1)
            // }
            // let myTicketIndex = AppState.myTickets.findIndex(t => t.ticketId === ticketId)
            // if (myTicketIndex >= 0){
            //     AppState.splice(myTicketIndex, 1)
            // }
            // AppState.tickets = new Ticket
            
        } catch (error) {
            Pop.error(error.message)
            logger.error(error)
        }
    }
}
export const ticketService = new TicketService()