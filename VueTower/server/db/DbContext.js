import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { CommentSchema } from "../models/Comment.js";
import { EventSchema } from "../models/Event.js";
import { TicketSchema } from "../models/Ticket.js";
import { ValueSchema } from '../models/Value.js'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Events = mongoose.model('Event', EventSchema);
  Tickets = mongoose.model('Ticket', TicketSchema);
  Comments = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
