<template>
    <!-- SECTION Event Details -->
    <div class="container-fluid">
        <div v-if="event" class="card mb-3">
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
                                    <h6>{{ event.capacity }}</h6><span>spots left</span>
                                </div>
                                <div>
                                    <button v-if="event.isCancelled" class="btn btn-outline-danger" disabled>Event is
                                        cancelled</button>
                                    <button v-else-if="account.id && (ticketSold === false)" @click="createTicket()"
                                        class="btn btn-warning">Attend<i class="mdi mdi-account-plus"></i></button>
                                    <button v-else-if="account.id && (ticketSold === true)" @click="removeTicket()"
                                        class="btn btn-outline-danger">Not attending<i
                                            class="mdi mdi-account-minus"></i></button>
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
        <div class="row">

        </div>
    </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { Account } from "../models/Account";
import { eventService } from "../services/EventService.js";
import { ticketService } from "../services/TicketService.js";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop.js";

export default {
    setup() {

        const route = useRoute();
        let ticketSold = false;
        async function getEventByEventId() {
            try {
                await eventService.getEventByEventId(route.params.eventId);
            } catch (error) {
                Pop.error(error.message);
                logger.error(error);
            }
        }
        onMounted(() => {
            getEventByEventId();
        })
        return {
            event: computed(() => AppState.activeEvent),
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.tickets),

            // haveTicket: computed(() => AppState.tickets.find(t => t.ticketId == AppState.myTickets.id)),
            async createTicket() {
                try {
                    await ticketService.createTicket({
                        eventId: route.params.eventId
                    });
                    ticketSold = true;
                } catch (error) {
                    Pop.error(error.message)
                    logger.error(error);
                }
            },
            async removeTicket(ticketId) {
                try {
                    if (await Pop.confirm()) {
                        await ticketService.removeTicket(ticketId);
                    }
                } catch (error) {
                    Pop.error(error.message);
                    logger.error(error);
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">

</style>