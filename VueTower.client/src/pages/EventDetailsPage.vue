<template>
    <!-- SECTION Event Details -->
    <div class="container-fluid">
        <div v-if="event" class="card mb-3 text-dark">
            <div class=" row g-0">
                <div class="col-md-4">
                    <img :src="event.coverImg" class="img-fluid rounded-start" alt="..." />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 d-flex justify-content-between">
                                <h5>{{ event.name }}</h5>
                                <h5>{{ event.startDate }}</h5>
                            </div>
                            <div class="col-12 d-flex justify-content-between">
                                <h6>{{ event.location }}</h6>
                            </div>
                            <div class="col-12">
                                <p>
                                    {{ event.description }}
                                </p>
                            </div>
                            <div class="col-12 d-flex justify-content-between">
                                <div>
                                    <h6 :class="`${event.capacity === 0 ? 'red' : 'green'}`">{{ event.capacity }}</h6>
                                    <span>spots left</span>
                                </div>
                                <div>
                                    <button v-if="event.isCanceled == true" class="btn btn-outline-danger"
                                        disabled>Event is
                                        cancelled</button>
                                    <button v-else-if="event.isCanceled == false && event.creatorId === account.id"
                                        @click="cancelEvent()" class="btn btn-danger">Cancel
                                        Event</button>
                                </div>
                                <div>
                                    <button v-if="account.id && !foundTicket" @click="createTicket()"
                                        class="btn btn-warning">Attend<i class="mdi mdi-account-plus"></i></button>
                                    <button v-else-if="account.id" @click="removeTicket(foundTicket.ticketId)"
                                        class="btn btn-outline-danger">Not
                                        attending<i class="mdi mdi-account-minus"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--SECTION See who is attending-->
    <div class="container-fluid">
        <h3 class="text-light">See who's attending:</h3>
        <div class="row g-0 mb-5">
            <div v-for="t in tickets" class="col">
                <img :src="t.profile.picture" :title="t.profile.name" width="40" class="rounded" />
            </div>
        </div>
    </div>
    <!--SECTION Comments-->
    <div class="container-fluid" style="margin-top: 10px">
        <div class="row">
            <div class="col-8">
                <form @submit.prevent="createComment()">
                    <textarea v-model="editable.body" class="form-floating mb-3 elevation-5 text-dark" id="comment"
                        placeholder="Talk about the event" cols="30" rows="10"></textarea>
                    <button class="btn btn-success" type="submit">Submit</button>
                </form>
            </div>
        </div>
        <!--TODO fix style for comments-->
        <div v-for="comment in comments">
            <h5>{{ comment.creator.name }}</h5>
            <img :src="comment.creator.picture" :title="comment.creator.name" width="40" class="rounded" />
            <p>{{ comment.body }}</p>
            <button class="btn btn-danger" @click="deleteComment(comment.id)">Delete Comment<i
                    class="mdi mdi-trash-can"></i></button>
        </div>
    </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { commentService } from "../services/CommentService.js";
import { eventService } from "../services/EventService.js";
import { ticketService } from "../services/TicketService.js";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop.js";

export default {
    setup() {
        const editable = ref({})
        const route = useRoute();
        async function getEventByEventId() {
            try {
                await eventService.getEventByEventId(route.params.eventId);
            } catch (error) {
                Pop.error(error.message);
                logger.error(error);
            }
        }
        async function getMyTickets() {
            try {
                await ticketService.getMyTickets(route.params.eventId);
            } catch (error) {
                Pop.error(error.message);
                logger.error(error);
            }
        }
        async function getEventTickets() {
            try {
                await eventService.getEventTickets(route.params.eventId)
            } catch (error) {
                Pop.error(error.message);
                logger.error(error);
            }
        }
        async function getEventComments() {
            try {
                await eventService.getEventComments(route.params.eventId)
            } catch (error) {
                Pop.error(error.message);
                logger.error(error);
            }
        }
        onMounted(() => {
            getEventByEventId();
            // getMyTickets();
            getEventTickets();
            getEventComments();
        })
        return {
            editable,
            event: computed(() => AppState.activeEvent),
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.tickets),
            foundTicket: computed(() => AppState.myTickets.find(ticket => ticket.eventId == AppState.activeEvent.eventId)),
            comments: computed(() => AppState.comments),

            async createTicket() {
                try {
                    await ticketService.createTicket({
                        eventId: route.params.eventId
                    });
                    getEventTickets()
                } catch (error) {
                    Pop.error(error.message)
                    logger.error(error);
                }
            },
            async removeTicket(ticketId) {
                try {
                    if (await Pop.confirm()) {
                        await ticketService.removeTicket(ticketId);
                    };
                    getEventTickets()
                } catch (error) {
                    Pop.error(error.message);
                    logger.error(error);
                }
            },
            async cancelEvent() {
                try {
                    if (await Pop.confirm()) {
                        this.event.isCanceled = true
                        await eventService.cancelEvent(this.event);
                    }
                } catch (error) {
                    Pop.error(error);
                    logger.error(error);
                }
            },
            async createComment() {
                try {
                    editable.value.eventId = route.params.eventId
                    await commentService.createComment(editable.value)
                } catch (error) {
                    Pop.error(error);
                    logger.error(error);
                }
            },
            async deleteComment(commentId) {
                try {
                    await commentService.deleteComment(commentId)
                } catch (error) {
                    Pop.error(error);
                    logger.error(error);
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
.red {
    color: red
}

.green {
    color: rgb(71, 243, 71)
}
</style>