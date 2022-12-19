<template>
    <div class="container-fluid">
        <h1>Upcoming Events</h1>
        <div class="row">
            <div v-for="ticket in myTickets" class="col-12 col-md-3 mb-3 p-4">
                <EventCard :event="ticket.event" />
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import EventCard from "../components/EventCard.vue";
export default {
    setup() {
        return {
            account: computed(() => AppState.account),
            myTickets: computed(() => AppState.myTickets),
            tickets: computed(() => AppState.tickets),
        };
    },
    components: { EventCard }
}
</script>

<style scoped>
img {
    max-width: 100px;
}
</style>
