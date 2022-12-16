import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentService } from "../services/CommentService.js";
import BaseController from "../utils/BaseController";

export class CommentController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createComment)
        .delete('/:commentId', this.removeComment)
    }
    async createComment(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const comment = await commentService.createComment(req.body)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }
    async removeComment(req, res, next) {
        try {
            const message = await commentService.removeComment(req.params.commentId, req.userInfo.id)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}