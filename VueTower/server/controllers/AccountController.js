import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { ticketService } from "../services/TicketService"
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getMyTickets)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

   async getMyTickets(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const tickets = await ticketService.getMyTickets(req.body.accountId)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }

}
