<template>
    <div class="modal fade" id="CreateEvent" tabindex="-1" aria-labelledby="createEventLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="createEventModalLabel">Create Event</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="createEvent()">
                    <div class="modal-body">

                        <div class="form-floating mb-3 elevation-5 text-dark">
                            <input v-model="editable.name" type="text" required class="form-control" id="name"
                                placeholder="Event Name" />
                            <label for="name">Event Name</label>
                        </div>

                        <div class="form-floating mb-3 elevation-5 text-dark">
                            <input v-model="editable.coverImg" type="url" required class="form-control" id="coverImg"
                                placeholder="Event Cover Image" />
                            <label for="coverImg">CoverImg</label>
                        </div>

                        <div class="form-floating mb-3 elevation-5 text-dark">
                            <input v-model="editable.location" type="text" required class="form-control" id="location"
                                placeholder="Event Location" />
                            <label for="location">Event Location</label>
                        </div>

                        <div class="form-floating mb-3 elevation-5 text-dark">
                            <input v-model="editable.capacity" type="number" required class="form-control" id="capacity"
                                placeholder="Event Capacity" />
                            <label for="capacity">Capacity</label>
                        </div>

                        <div class="form-floating mb-3 elevation-5 text-dark">
                            <input v-model="editable.startDate" type="date" required class="form-control" id="startDate"
                                placeholder="StartDate" />
                            <label for="startDate">Start Date</label>
                        </div>

                        <div class="form-floating mb-3 elevation-5 text-dark">
                            <select v-model="editable.type" class="form-select" id="type" aria-label="type">
                                <option selected>Open this select menu</option>
                                <option value="concert">Concert</option>
                                <option value="convention">Convention</option>
                                <option value="sport">Sport</option>
                                <option value="digital">Digital</option>
                            </select>
                            <label for="type">Type of Event</label>
                        </div>

                        <div class="form-floating mb-3 elevation-5 text-dark">
                            <textarea v-model="editable.description" class="form-control"
                                placeholder="Event Description" id="description">Event Description</textarea>
                            <label for="description">Description</label>
                        </div>

                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Create Event</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { eventService } from "../services/EventService";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { Modal } from 'bootstrap';
import { router } from "../router";
export default {

    setup() {
        const editable = ref({})
        return {
            editable,
            async createEvent() {
                try {
                    const event = await eventService.createEvent(editable.value)
                    Pop.success('Successfully created event')
                    editable.value = {}
                    Modal.getOrCreateInstance('#CreateEvent').hide()
                    router.push({ name: 'EventDetails', params: { eventId: event.id } })
                } catch (error) {
                    Pop.error(error.message)
                    logger.error(error)
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">

</style>