import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class CommentService {
    async createComment(body) {
        try {
            const res = await api.post('api/comments', body)
            logger.log('[Create comment]', res.data)
            AppState.comments.unshift(res.data)
        } catch (error) {
            Pop.error(error.message)
            logger.error(error)
        }
    }
    async deleteComment(commentId) {
        try {
            const res = await.delete('api/comments/' + commentId)
            logger.log('[Deleting comment]', res.data)
            let index = AppState.comments.findIndex(c => c.commentId === commentId)
            if(index >= 0){
                AppState.splice(index, 1)
            }
        } catch (error) {
            Pop.error(error.message)
            logger.error(error)
        }
    }
}
export const commentService = new CommentService()