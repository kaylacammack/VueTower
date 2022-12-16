<template>

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 bg-primary p-2 rounded d-flex justify-content-between">
                <button @click="filterBy = ''" class="btn btn-warning fw-bold">All</button>
                <button @click="filterBy = 'concert'" class="btn btn-warning fw-bold">Concert</button>
                <button @click="filterBy = 'convention'" class="btn btn-warning fw-bold">Convention</button>
                <button @click="filterBy = 'sport'" class="btn btn-warning fw-bold">Sport</button>
                <button @click="filterBy = 'digital'" class="btn btn-warning fw-bold">Digital</button>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div v-for="e in events" class="col-12 col-md-3 mb-3 p-4">
                <EventCard :event="e" />
            </div>
        </div>
    </div>

</template>

<script>
import { onMounted, computed, ref } from "vue";
import { AppState } from "../AppState.js";
import { eventService } from "../services/EventService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import EventCard from '../components/EventCard.vue';

export default {
    setup() {
        const filterBy = ref("");
        async function getAllEvents() {
            try {
                await eventService.getAllEvents();
            } catch (error) {
                Pop.error(error.message)
                logger.error(error)
            }
        }
        onMounted(() => {
            getAllEvents();
        });
        return {
            filterBy,
            events: computed(() => {
                if (filterBy.value == "") {
                    return AppState.events;
                }
                else {
                    return AppState.events.filter(e => e.type == filterBy.value);
                }
            })
        };
    },
    components: { EventCard }
}
</script>

<style scoped lang="scss">

</style>
